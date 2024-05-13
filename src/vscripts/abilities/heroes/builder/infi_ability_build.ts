import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import { TowerHandler } from "../../../tower/tower_handler";
import { TowerConstants } from "../../../constant/constants";

const _buildingUtil = new TowerHandler();

@registerAbility()
export class infi_ability_build extends BaseAbility
{
    OnSpellStart() {
        const caster = this.GetCaster();
        const pos = this.GetCursorPosition();
        const building = _buildingUtil.CreateHeroTowerBasedOnPos(TowerConstants.TowerLinaName, pos);
        building.SetOwner(caster);
  		// building.RemoveModifierByName("modifier_invulnerable");
  		// building.RemoveAbility("backdoor_protection_in_base");
    }
}