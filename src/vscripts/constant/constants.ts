
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
}