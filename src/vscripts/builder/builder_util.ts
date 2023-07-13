
export class BuilderUtil{
    constructor(){
    }

    public HandleNpcSpawnedForBuilder(event: NpcSpawnedEvent): void {
        const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC; 
        if(unit.GetName()===this.GetBuilderHeroName()){
            this.InitBuilderAbilities(unit);
        }
    }

    public GetBuilderHeroName(): string{
        return "npc_dota_hero_wisp";
    }

    private InitBuilderAbilities(unit: CDOTA_BaseNPC): void {
        unit.FindAbilityByName("infi_ability_upgrade")?.UpgradeAbility(true);
        unit.FindAbilityByName("infi_ability_move")?.UpgradeAbility(true);
        unit.FindAbilityByName("infi_ability_sell")?.UpgradeAbility(true);
    }
}