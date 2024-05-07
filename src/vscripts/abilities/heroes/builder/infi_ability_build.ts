import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import { BuildingUtil } from "../../../buildings/building_util";

const _buildingUtil = new BuildingUtil();

@registerAbility()
export class infi_ability_build extends BaseAbility
{
    OnSpellStart() {
        const caster = this.GetCaster();
        const pos = this.GetCursorPosition();
        const building = _buildingUtil.CreateBuildingBasedOnPos("npc_dota_hero_lina", pos);
        building.SetOwner(caster);
  		// building.RemoveModifierByName("modifier_invulnerable");
  		// building.RemoveAbility("backdoor_protection_in_base");
    }
}