import { CreepConstants, GameConstants } from "../constant/constants";


export class CreepUtil {
    private roundCnt: number = 0;
    private roundTimer: number = 0;

    constructor(){
        this.roundCnt=1;
    }

    public RegisterCreepsLifecycle(): void{
        print("register creep");
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.StartNewRound());
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.CountRoundInterval());
    }

    private StartNewRound(): number {
        print("start new round:", this.roundCnt);
        this.roundTimer=CreepConstants.CreepRoundInterval;
        this.roundCnt++;
        return CreepConstants.CreepRoundInterval;
    }

    private CountRoundInterval(): number {
        print("round timer:", this.roundTimer);
        this.roundTimer--;
        return 1.0
    }
}