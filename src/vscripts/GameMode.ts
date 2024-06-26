import { reloadable } from "./lib/tstl-utils";
import { modifier_creep_move } from "./modifier/modifier_creep_move";
import { CreepHandler } from "./creep/creep_handler";
import { TowerHandler } from "./tower/tower_handler";
import { BuilderHandler } from "./builder/builder_handler";


declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    private builderHandler: BuilderHandler = new BuilderHandler();
    private towerHandler: TowerHandler = new TowerHandler();
    private creepHandler: CreepHandler = new CreepHandler();

    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    }

    public static Activate(this: void) {
        // When the addon activates, create a new instance of this GameMode class.
        GameRules.Addon = new GameMode();
    }

    constructor() {
        this.InitGameRules();
        this.RegisterEvents();

        this.towerHandler.InitTowersBase();
    }

    private InitGameRules(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 2);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 1);

        // initial loading...初始界面
        GameRules.EnableCustomGameSetupAutoLaunch(true);
        GameRules.SetCustomGameSetupAutoLaunchDelay(0);

        // select builders
        const gameModeObj = GameRules.GetGameModeEntity();
        gameModeObj.SetCustomGameForceHero(this.builderHandler.GetBuilderHeroName());
    }

    private RegisterEvents(): void {
        // Register event listeners for dota engine events
        ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
        ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);

        // Register event listeners for events from the UI
        CustomGameEventManager.RegisterListener("ui_panel_closed", (_, data) => {
            print(`Player ${data.PlayerID} has closed their UI panel.`);

            // Respond by sending back an example event
            const player = PlayerResource.GetPlayer(data.PlayerID)!;
            CustomGameEventManager.Send_ServerToPlayer(player, "example_event", {
                myNumber: 42,
                myBoolean: true,
                myString: "Hello!",
                myArrayOfNumbers: [1.414, 2.718, 3.142]
            });

            // Also apply the panic modifier to the sending player's hero
            //const hero = player.GetAssignedHero();
            //hero.AddNewModifier(hero, undefined, modifier_panic.name, { duration: 55 });
        });
    }

    public OnStateChange(): void {
        const state = GameRules.State_Get();

        // // Add 4 bots to lobby in tools
        // if (IsInToolsMode() && state == GameState.CUSTOM_GAME_SETUP) {
            // Tutorial.AddBot("npc_dota_hero_lina", "", "", false);
        // }

        // if (state === GameState.CUSTOM_GAME_SETUP) {
        //     // Automatically skip setup in tools
        //     if (IsInToolsMode()) {
        //         Timers.CreateTimer(3, () => {
        //             GameRules.FinishCustomGameSetup();
        //         });
        //     }
        // }

        // Start game once pregame hits
        if (state === GameState.PRE_GAME) {
            Timers.CreateTimer(0.2, () => this.StartGame());
        }
    }

    private StartGame(): void {
        this.creepHandler.RegisterCreepsLifecycle();
    }

    // Called on script_reload
    public Reload() {
        print("Script reloaded!");
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {
        this.builderHandler.HandleNpcSpawnedForBuilder(event);
    }
}
