import { CreepConstants, GameConstants } from "../constant/constants";
import { modifier_panic } from "../modifier/modifier_panic";
import { TowerUtil } from "../tower/tower_util";


export class CreepUtil {
    private towerUtil: TowerUtil = new TowerUtil();
    private roundCnt: number = 0;
    private roundTimer: number = 0;
    private creep2step: Map<CDOTA_BaseNPC, number>;

    constructor(){
        this.roundCnt=-1;
        this.creep2step = new Map<CDOTA_BaseNPC, number>();
    }

    public RegisterCreepsLifecycle(): void{
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.StartNewRound());
        Timers.CreateTimer(GameConstants.PrepareTimeBeforeCreep, () => this.CountRoundInterval());
    }

    public MoveToNextPos(unit: CDOTA_BaseNPC): void {
        const n = CreepConstants.Route.length;
        let idx: number = -1;
        if(this.creep2step.has(unit)) {
            idx = this.creep2step.get(unit) ?? -1;
        }
        if(idx===-1) {
            print("creep pos wrong");
        } else if(idx==n-1) {
            // todo(binyan.li)
            print("destroy and remove from table");
        } else {
            const curPos = unit.GetAbsOrigin();
            const curEnt = this.towerUtil.FindBaseEntityByPos(curPos);
            if(CreepConstants.Route[idx]!=curEnt.GetName()) {
                const nxtEntName = CreepConstants.Route[idx+1];
                const entity = Entities.FindByName(undefined, nxtEntName) as CDOTA_BaseNPC;
                const nxtPos = entity.GetCenter();
                unit.MoveToPosition(nxtPos);
            }
        }
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
        this.creep2step.set(unit, 0);
    }

    public GenerateSummonedCreep(): void {
        print("summoned creep");
    }
}