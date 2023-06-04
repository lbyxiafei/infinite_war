interface HPChangedEvent {
    playerID: PlayerID,
    hpPercentage: number
}

class ExampleUI {
    // Instance variables
    panel: Panel;
    playerPanels: Partial<Record<PlayerID, PlayerPortrait>> = {}; // A map with number keys and PlayerPortrait values

    // ExampleUI constructor
    constructor(panel: Panel) {
        this.panel = panel;

        // Find container element
        const container = this.panel.FindChild("HeroPortraits")!;

        // Create portrait for player 0, 1 and 2
        const portrait0 = new PlayerPortrait(container, "npc_dota_hero_juggernaut", "Player0");
        const portrait1 = new PlayerPortrait(container, "npc_dota_hero_omniknight", "Player1");
        const portrait2 = new PlayerPortrait(container, "npc_dota_hero_invoker", "Player2");

        // Set HP of player 1 and 2 to a different value
        portrait0.SetHealthPercent(80);
        portrait2.SetHealthPercent(20);

        $.Msg("OnHPChanged???"); 
        // Listen for health changed event, when it fires, handle it with this.OnHPChanged
        GameEvents.Subscribe<HPChangedEvent>("player_spawn", (event) => this.OnHPChanged(event));
    }

    // Event handler for HP Changed event
    OnHPChanged(event: HPChangedEvent) {
        $.Msg("OnHPChanged !!!" + event);

        // Get portrait for this player
        const playerPortrait = this.playerPanels[event.playerID];

        if(playerPortrait !== undefined){
            // Set HP on the player panel
            playerPortrait.SetHealthPercent(event.hpPercentage);
        }
        else{
            $.Msg("No player portrait found!");
        }
    }
}

let ui = new ExampleUI($.GetContextPanel());