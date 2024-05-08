import { TowerConstants } from "../constant/constants";

export class BuildingUtil {
    constructor(){}

    public InitTowersBase(): void {
        const entities = this.FindAllTowerBases();
        for(const e of entities) {
            const tower_base = this.CreateBuildingBasedOnBaseEntityName(TowerConstants.TowerBaseName, e.GetName());
            const tb_origin = tower_base.GetOrigin()
            tb_origin.z-=100
            tower_base.SetOrigin(tb_origin)
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
        const unit = this.CreateBuildingBasedOnBaseEntity(buildingName, entity);
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

    private CreateBuildingBasedOnBaseEntity(
        buildingName: string, 
        entity: CBaseEntity, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const pos = entity.GetCenter();
        const unit = CreateUnitByName(buildingName, pos, false, undefined, undefined, member) as CDOTA_BaseNPC;
        return unit;
    }

    private CreateBuildingBasedOnBaseEntityName(
        buildingName: string, 
        entityName: string, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        return this.CreateBuildingBasedOnBaseEntity(buildingName, entity);
    }

    private IsTowerEntity(entity: CBaseEntity): boolean {
        const name = entity.GetName();
        if (name && TowerConstants.TowerPrefixes.some(prefix => name.startsWith(prefix))) {
            const parts = name.split("_");
            const lastPart = parts[parts.length - 2];
            const num = parseInt(lastPart);
            if (!isNaN(num) && num >= 0 && num <= 2) {
                return true;
            }
        }
        return false;
    }

    //private IsTowerEntity(e: CBaseEntity): boolean {
    //    if(e !== undefined && (e.GetName().startsWith("base_left_0") 
    //        || e.GetName().startsWith("base_left_1") 
    //        || e.GetName().startsWith("base_left_2")
    //        || e.GetName().startsWith("base_right_0")
    //        || e.GetName().startsWith("base_right_1")
    //        || e.GetName().startsWith("base_right_2"))) {
    //            return true
    //        }  
    //    return false
    //}
}