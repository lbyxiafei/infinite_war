import "./lib/timers";
import { GameMode } from "./GameMode";

// This is the entry point.

// Connect GameMode.Activate and GameMode.Precache to the dota engine
Object.assign(getfenv(), {
    Activate: GameMode.Activate,
    Precache: GameMode.Precache,
});

if (GameRules.Addon !== undefined) {
    // This code is only run after script_reload, not at startup
    GameRules.Addon.Reload();
}
