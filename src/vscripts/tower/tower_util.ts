import { TowerConstants } from "../constant/constants";

export class TowerUtil {
    constructor(){}

    public InitTowersBase(): void {
        const entities = this.FindAllTowerBases();
        for(const e of entities) {
            const tower_base = this.CreateBuildingBasedOnEntityName(TowerConstants.TowerBaseName, e.GetName());
            const tb_origin = tower_base.GetOrigin()
            tb_origin.z-=100
            tower_base.SetOrigin(tb_origin)
            tower_base.AddNewModifier(tower_base, undefined, "modifier_invulnerable", undefined);
        }
    }

    public ReplaceTower(): void {
        // todo(binyan.li)
        // imple replace func for existing entity
        // instead of destroy
    }

    public CreateBuildingBasedOnPos(
        buildingName: string, 
        pos: Vector,
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const entity = this.FindBaseEntityByPos(pos) as CBaseEntity;
        const unit = this.CreateBuildingBasedOnEntity(buildingName, entity);
        return unit;
    }

    public FindAllTowerBases(): CBaseEntity[]{
        const entities = Entities.FindAllByClassnameWithin(TowerConstants.TowerBaseEntityClassname, Vector(), 10000) as CBaseEntity[];
        let res:CBaseEntity[] = [];
        for(const e of entities) {
            if(this.IsTowerEntity(e)) {
                res.push(e);
            }
        }
        return res;
    }

    public FindBaseEntityByPos(pos: Vector): CBaseEntity{
        const entities = Entities.FindAllByClassnameWithin(TowerConstants.TowerBaseEntityClassname, pos, 1) as CBaseEntity[];
        for(const e of entities){
            if(!this.IsTowerEntity(e)){
                continue;
            }
            return e;
        }
        throw "BuildingUtil/FindBaseEntityByPos: Can't find entity.";
    }

    public CreateBuildingBasedOnEntity(
        buildingName: string, 
        entity: CBaseEntity, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const pos = entity.GetCenter();
        const unit = CreateUnitByName(buildingName, pos, false, undefined, undefined, member) as CDOTA_BaseNPC;
        return unit;
    }

    public CreateBuildingBasedOnEntityName(
        buildingName: string, 
        entityName: string, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        return this.CreateBuildingBasedOnEntity(buildingName, entity, member);
    }

    private IsTowerEntity(entity: CBaseEntity): boolean {
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