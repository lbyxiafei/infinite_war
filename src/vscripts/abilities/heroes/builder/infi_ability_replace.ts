import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class infi_ability_replace extends BaseAbility
{
    OnSpellStart(): void {
        const caster = this.GetCaster();
        const target = this.GetCursorTarget();
        
        print(target)
        target?.Destroy();
    }
}