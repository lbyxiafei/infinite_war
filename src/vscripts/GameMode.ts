import { reloadable } from "./lib/tstl-utils";
import { modifier_panic } from "./modifiers/modifier_panic";

const heroSelectionTime = 20;
const forceHero = "wisp";

declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
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

        this.Experiment();
    }

    private Experiment(): void {
        //const entities = Entities.FindAllByClassname("info_target") as CDOTA_BaseNPC[];
        //for (const e of entities){
        //    print("test: " + e.GetAbsOrigin());
        //}
        const tg = Entities.FindByName(undefined, "trigger_0") as CDOTA_BaseNPC;
        if(tg){
            print("test?: trigger " + tg.GetAbsOrigin());
        }
        else{
            print("test!");
        }

        const tt = Entities.FindByName(undefined, "target_0") as CDOTA_BaseNPC;
        if(tt){
            print("test?: target " + tt.GetAbsOrigin());
        }
        else{
            print("test!");
        }

        const bd = Entities.FindByName(undefined, "building_0") as CDOTA_BaseNPC;
        if(tt){
            print("test?: building " + bd.GetAbsOrigin());
            bd.AddNewModifier(bd, undefined, modifier_panic.name, { duration: 11 });
        }
        else{
            print("test!");
        }
    }

    private InitGameRules(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 3);

        GameRules.SetShowcaseTime(0);
        GameRules.SetHeroSelectionTime(heroSelectionTime);
        // Debug build
        if(IsInToolsMode()){ 
            // skip all the starting game mode stages e.g picking screen, showcase, etc
            GameRules.EnableCustomGameSetupAutoLaunch(true);
            GameRules.SetCustomGameSetupAutoLaunchDelay(0);
            GameRules.SetHeroSelectionTime(10);
            GameRules.SetStrategyTime(0);
            GameRules.SetPreGameTime(0);
            GameRules.SetShowcaseTime(0);
            GameRules.SetPostGameTime(5);
            // disable music events
            GameRules.SetCustomGameAllowHeroPickMusic(false);
            GameRules.SetCustomGameAllowMusicAtGameStart(false);
            GameRules.SetCustomGameAllowBattleMusic(false);
            //multiple players can pick the same hero
            GameRules.SetSameHeroSelectionEnabled(true);

            // disable some setting which are annoying then testing
            const gameModeObj = GameRules.GetGameModeEntity();
            gameModeObj.SetAnnouncerDisabled(true);
            gameModeObj.SetKillingSpreeAnnouncerDisabled(true);
            gameModeObj.SetDaynightCycleDisabled(true);
            gameModeObj.DisableHudFlip(true);
            gameModeObj.SetDeathOverlayDisabled(true);
            gameModeObj.SetWeatherEffectsDisabled(true);

            gameModeObj.SetCustomGameForceHero(forceHero);
        }
        else{
            // Release build
        }
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

        // Add 4 bots to lobby in tools
        if (IsInToolsMode() && state == GameState.CUSTOM_GAME_SETUP) {
            for (let i = 0; i < 4; i++) {
                Tutorial.AddBot("npc_dota_hero_lina", "", "", false);
            }
        }

        if (state === GameState.CUSTOM_GAME_SETUP) {
            // Automatically skip setup in tools
            if (IsInToolsMode()) {
                Timers.CreateTimer(3, () => {
                    GameRules.FinishCustomGameSetup();
                });
            }
        }

        // Start game once pregame hits
        if (state === GameState.PRE_GAME) {
            Timers.CreateTimer(0.2, () => this.StartGame());
        }
    }

    private StartGame(): void {
        print("Game starting!");

        // Do some stuff here
    }

    // Called on script_reload
    public Reload() {
        print("Script reloaded!");

        // Do some stuff here
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {
        // After a hero unit spawns, apply modifier_panic for 8 seconds
        const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC; 
        // Give all real heroes (not illusions) the meepo_earthbind_ts_example spell
        if (unit.IsRealHero()) {
            if (!unit.HasAbility("meepo_earthbind_ts_example")) {
                // Add lua ability to the unit
                unit.AddAbility("meepo_earthbind_ts_example");
            }
        }
    }
}
