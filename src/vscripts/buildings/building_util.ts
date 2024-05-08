import { modifier_panic } from "../modifiers/modifier_panic";

export class BuildingUtil {
    constructor(){
    }

    public InitTowersBase(): void {
        this.CreateBuildingBasedOnBaseEntityName("npc_dota_hero_morphling", "base_left_0_0");
    }

    public ReplaceTower(): void {

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