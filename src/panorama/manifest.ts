$.Msg("ui manifest loaded");

// Disable default hud
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, false);

GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, false);

// Register custom key bindings
function OnExecuteAbility1ButtonPressed()
{
  $.Msg("'S' Pressed or Released");
}

function OnTestButtonPressed()
{
  $.Msg("'Z' Pressed");
}

function OnTestButtonReleased()
{
  $.Msg("'Z' Released");
}

(function() {
  Game.AddCommand( "CustomGameExecuteAbility1", OnExecuteAbility1ButtonPressed, "", 1<<32 );
  Game.AddCommand( "+CustomGameTestButton", OnTestButtonPressed, "", 1<<32 );
  Game.AddCommand( "-CustomGameTestButton", OnTestButtonReleased, "", 1<<32 );
})();