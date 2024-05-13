import { CreepConstants, GameConstants } from "../constant/constants";
import { modifier_panic } from "../modifier/modifier_panic";
import { TowerHandler } from "../tower/tower_handler";


export class CreepHandler {
    private towerUtil: TowerHandler = new TowerHandler();
    private roundCnt: number = 0;
    private roundTimer: number = 0;

    constructor(){
        this.roundCnt=-1;
    }

    public RegisterCreepsLifecycle(): void{
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.StartNewRound());
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.CountRoundInterval());
    }

    private StartNewRound(): number {
        this.roundTimer=CreepConstants.CreepRoundInterval;
        this.roundCnt++;
        CustomGameEventManager.Send_ServerToAllClients("creep_round_count", {round_cnt:this.roundCnt});
        this.GenerateRoundCreeps();
        return CreepConstants.CreepRoundInterval;
    }

    private CountRoundInterval(): number {
        this.roundTimer--;
        CustomGameEventManager.Send_ServerToAllClients("creep_round_time", {time_left:this.roundTimer});
        return 1.0
    }

    private GenerateRoundCreeps(): void {
        const unit = this.towerUtil.CreateBuildingBasedOnEntityName("creep_zeus", CreepConstants.CreepOriginPosition, DotaTeam.BADGUYS);
        unit.AddNewModifier(unit, undefined, modifier_panic.name, {duration: 55});
        CreepConstants.Creep2Step.set(unit, 0);
    }

    public GenerateSummonedCreep(): void {
        print("summoned creep");
    }
}