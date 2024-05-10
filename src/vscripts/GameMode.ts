import { reloadable } from "./lib/tstl-utils";
import { modifier_panic } from "./modifier/modifier_panic";
import { CreepUtil } from "./creep/creep_util";
import { TowerUtil } from "./tower/tower_util";
import { BuilderUtil } from "./builder/builder_util";


declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    private builderUtil: BuilderUtil = new BuilderUtil();
    private towerUtil: TowerUtil = new TowerUtil();
    private creepUtil: CreepUtil = new CreepUtil();

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

        this.towerUtil.InitTowersBase();
    }

    private InitGameRules(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 2);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 1);

        // initial loading...初始界面
        GameRules.EnableCustomGameSetupAutoLaunch(true);
        GameRules.SetCustomGameSetupAutoLaunchDelay(0);

        // select builders
        const gameModeObj = GameRules.GetGameModeEntity();
        gameModeObj.SetCustomGameForceHero(this.builderUtil.GetBuilderHeroName());
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
        //     Tutorial.AddBot("npc_dota_hero_lina", "", "", false);
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
        this.creepUtil.RegisterCreepsLifecycle();
    }

    // Called on script_reload
    public Reload() {
        print("Script reloaded!");
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {
        this.builderUtil.HandleNpcSpawnedForBuilder(event);
    }
}
