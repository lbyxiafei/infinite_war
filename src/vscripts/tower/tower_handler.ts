import { TowerConstants } from "../constant/constants";
import { MapUtil } from "../util/map_util";

export class TowerHandler {
    private mapUtil: MapUtil = new MapUtil();

    constructor(){}

    public InitTowersBase(): void {
        const entities = this.mapUtil.FindAllHeroEntities();
        for(const e of entities) {
            const tower_base = this.CreateHeroTowerBasedOnEntityName(TowerConstants.TowerBaseName, e.GetName());
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

    public CreateHeroTowerBasedOnPos(
        buildingName: string, 
        pos: Vector,
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const entity = this.mapUtil.FindHeroEntityBasedOnPos(pos) as CBaseEntity;
        const unit = this.CreateHeroTowerBasedOnEntity(buildingName, entity);
        return unit;
    }

    public CreateHeroTowerBasedOnEntity(
        buildingName: string, 
        entity: CBaseEntity, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const pos = entity.GetCenter();
        const unit = CreateUnitByName(buildingName, pos, false, undefined, undefined, member) as CDOTA_BaseNPC;
        return unit;
    }

    public CreateHeroTowerBasedOnEntityName(
        buildingName: string, 
        entityName: string, 
        member=DotaTeam.GOODGUYS): CDOTA_BaseNPC 
    {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        return this.CreateHeroTowerBasedOnEntity(buildingName, entity, member);
    }
}