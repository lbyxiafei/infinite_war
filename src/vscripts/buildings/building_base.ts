import { modifier_panic } from "../modifiers/modifier_panic";

export class BuildingBase {
    constructor(){
    }

    public InitBase(): void {
        const bd = Entities.FindByName(undefined, "building_0") as CDOTA_BaseNPC;
        if(bd){
            bd.AddNewModifier(bd, undefined, modifier_panic.name, { duration: 11 });
            const pos = bd.GetCenter();
            CreateUnitByName("npc_dota_badguys_tower1_bot", pos, false, undefined, undefined, DotaTeam.BADGUYS);
        }

        this.CreateNpcOnEntity("npc_dota_badguys_tower1_bot", "base_0");
    }

    private CreateNpcOnEntity(npcName: string, entityName: string, member=DotaTeam.GOODGUYS): void {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        if(entity){
            const pos = entity.GetCenter();
            CreateUnitByName(npcName, pos, false, undefined, undefined, member);
        }
        else{
            print("test: ???");
        }
    }
}