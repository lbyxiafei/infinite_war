
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
        for(let i=0; i<20; i++){
            const ability = unit.GetAbilityByIndex(i) as CDOTABaseAbility;
            ability?.UpgradeAbility(true);
        }
    }
}