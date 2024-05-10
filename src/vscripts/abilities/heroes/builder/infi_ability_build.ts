import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import { TowerUtil } from "../../../tower/tower_util";
import { TowerConstants } from "../../../constant/constants";

const _buildingUtil = new TowerUtil();

@registerAbility()
export class infi_ability_build extends BaseAbility
{
    OnSpellStart() {
        const caster = this.GetCaster();
        const pos = this.GetCursorPosition();
        const building = _buildingUtil.CreateBuildingBasedOnPos(TowerConstants.TowerLinaName, pos);
        building.SetOwner(caster);
  		// building.RemoveModifierByName("modifier_invulnerable");
  		// building.RemoveAbility("backdoor_protection_in_base");
    }
}