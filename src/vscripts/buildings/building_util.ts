import { modifier_panic } from "../modifiers/modifier_panic";

export class BuildingUtil {
    constructor(){}

    public InitTowersBase(): void {
        const entities = this.FindAllTowerBases();
        for(const e of entities) {
            const tower_base = this.CreateBuildingBasedOnBaseEntityName("npc_dota_hero_morphling", e.GetName());
            const tb_origin = tower_base.GetOrigin()
            tb_origin.z-=100
            tower_base.SetOrigin(tb_origin)
        }
    }

    public ReplaceTower(): void {}

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
        // todo(binyan.li)
        const entities = Entities.FindAllByClassnameWithin("trigger_dota", Vector(), 10000) as CBaseEntity[];
        let res:CBaseEntity[] = []
        for(const e of entities) {
            if(e.GetName().startsWith("base_left_0") 
            || e.GetName().startsWith("base_left_1") 
            || e.GetName().startsWith("base_left_2")
            || e.GetName().startsWith("base_right_0")
            || e.GetName().startsWith("base_right_1")
            || e.GetName().startsWith("base_right_2")) {
                res.push(e)
            }
        }
        return res
    }

    public FindBaseEntityByPos(pos: Vector): CBaseEntity{
        const baseEntities = Entities.FindAllByClassnameWithin("trigger_dota", pos, 1) as CBaseEntity[];
        for(const be of baseEntities){
            print("Found:" + be.GetName());
            return be;
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
}