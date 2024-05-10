import { CreepConstants, GameConstants } from "../constant/constants";


export class CreepUtil {
    private roundCnt: number = 0;

    constructor(){
        this.roundCnt=1;
    }

    public RegisterCreepsLifecycle(): void{
        print("register creep");
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.StartNewRound());
    }

    private StartNewRound(): number {
        print("start new round:", this.roundCnt);
        this.roundCnt+=1;
        return CreepConstants.CreepRoundInterval;
    }
}