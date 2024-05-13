import { TowerConstants } from "../constant/constants";

export class MapUtil {
    constructor() {}

    public FindEntitiesBasedOnPos(pos: Vector): CBaseEntity[] {
        const entities = Entities.FindAllByClassnameWithin(TowerConstants.TowerBaseEntityClassname, pos, 1) as CBaseEntity[];
        return entities;
    }

    public FindEntityBasedOnPos(pos: Vector): CBaseEntity {
        const entities = this.FindEntitiesBasedOnPos(pos);
        if(entities.length === 1) {
            return entities[0];
        }
        throw "Can't find entity based on pos";
    }

    public FindHeroEntityBasedOnPos(pos: Vector): CBaseEntity {
        const entities = this.FindEntitiesBasedOnPos(pos);
        for(const e of entities) {
            if(!this.IsEntityForHeroTower(e)) {
                continue;
            }
            return e;
        }
        throw "Can't find hero entity based on pos";
    }

    public FindAllHeroEntities(): CBaseEntity[] {
        const entities = Entities.FindAllByClassnameWithin(TowerConstants.TowerBaseEntityClassname, Vector(), 10000) 
        let res:CBaseEntity[] = [];
        for(const e of entities) {
            if(this.IsEntityForHeroTower(e)) {
                res.push(e);
            }
        }
        return res;
    }

     private IsEntityForHeroTower(entity: CBaseEntity): boolean {
        const name = entity.GetName();
        if (name && TowerConstants.TowerEntityPrefixes.some(prefix => name.startsWith(prefix))) {
            const parts = name.split("_");
            const lastPart = parts[parts.length - 2];
            const num = parseInt(lastPart);
            if (TowerConstants.TowerEntityNumIdentifiers.some(e => e===num)) {
                return true;
            }
        }
        return false;
    }
}