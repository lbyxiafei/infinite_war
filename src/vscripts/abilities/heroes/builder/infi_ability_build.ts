import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import { BuildingUtil } from "../../../buildings/building_util";

const _buildingUtil = new BuildingUtil();

@registerAbility()
export class infi_ability_build extends BaseAbility
{
    OnSpellStart() {
        const caster = this.GetCaster();
        const pos = this.GetCursorPosition();
        //const direction = ((pos - caster.GetAbsOrigin()) as Vector).Normalized();
        //direction.z = 0;
        //const distance = ((pos - caster.GetAbsOrigin()) as Vector).Length();
        const building = _buildingUtil.CreateBuildingBasedOnPos("npc_dota_badguys_tower1_bot", pos);
    }
}