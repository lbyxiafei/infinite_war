import { CreepConstants, GameConstants } from "../constant/constants";


export class CreepUtil {
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
        return CreepConstants.CreepRoundInterval;
    }

    private CountRoundInterval(): number {
        this.roundTimer--;
        CustomGameEventManager.Send_ServerToAllClients("creep_round_time", {time_left:this.roundTimer});
        return 1.0
    }
}