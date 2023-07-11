import { modifier_panic } from "../modifiers/modifier_panic";

export class BuildingBase {
    constructor(){
        print("test: building base constructor.");
    }

    public InitBase(): void {
        print("test: init base");

        const bd = Entities.FindByName(undefined, "building_0") as CDOTA_BaseNPC;
        if(bd){
            print("test?: building " + bd.GetAbsOrigin());
            bd.AddNewModifier(bd, undefined, modifier_panic.name, { duration: 11 });
        }
        else{
            print("test!");
        }

        const pos = bd.GetCenter();
        print("test pos:"+ pos);

        CreateUnitByName("npc_dota_badguys_tower1_bot", pos, true, undefined, undefined, DotaTeam.BADGUYS);

        this.CreateNpcOnEntity("npc_dota_badguys_tower1_bot", "base_1");
    }

    private CreateNpcOnEntity(npcName: string, entityName: string, member=DotaTeam.BADGUYS): void {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        if(entity){
            const pos = entity.GetCenter();
            CreateUnitByName(npcName, pos, false, undefined, undefined, member);
        }
    }
}