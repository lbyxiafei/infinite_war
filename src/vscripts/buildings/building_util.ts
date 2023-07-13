import { modifier_panic } from "../modifiers/modifier_panic";

export class BuildingUtil {
    constructor(){
    }

    public InitBase(): void {
        this.CreateNpcOnEntity("npc_dota_badguys_tower1_bot", "base_left_0");
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