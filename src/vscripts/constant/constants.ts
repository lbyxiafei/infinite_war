
export class GameConstants {
    static readonly PrepareTimeBeforeCreep: number = 0;
}

export class ModifierConstants {
    static readonly Invunerable: string = "modifier_invulnerable";
}

export class BuilderConstants {
    static readonly DefaultBuilderName: string = "npc_dota_hero_wisp";
}

export class TowerConstants {
    static readonly TowerBaseName: string = "npc_dota_hero_morphling";
    static readonly TowerLinaName: string = "npc_dota_hero_lina";
    static readonly TowerLunaName: string = "npc_dota_hero_luna";

    static readonly TowerBaseEntityClassname: string = "trigger_dota";

    static readonly TowerEntityNumIdentifiers: number[] = [0,1,2];
    static readonly TowerEntityPrefixes: string[] = ["base_left_", "base_right_"];
}

export class CreepConstants {
    static readonly CreepRoundInterval: number = 10;

    static readonly CreepOriginPosition: string= "base_x";

    static readonly Route: string[] = [
        "base_x", "base_left_3_0", "base_left_3_1", "base_left_3_2", "base_left_3_3", "base_left_3_4", "base_left_3_5", "base_left_3_6", "base_left_3_7", "base_left_3_8", "base_left_3_9", "base_left_3_10", "base_left_3_11", "base_left_3_12", "base_left_3_13", "base_left_3_14", "base_left_3_15", "base_left_3_16", "base_x", "base_right_3_0", "base_right_3_1", "base_right_3_2", "base_right_3_3", "base_right_3_4", "base_right_3_5", "base_right_3_6", "base_right_3_7", "base_right_3_8", "base_right_3_9", "base_right_3_10", "base_right_3_11", "base_right_3_12", "base_right_3_13", "base_right_3_14", "base_right_3_15", "base_right_3_16", "base_x"];
}