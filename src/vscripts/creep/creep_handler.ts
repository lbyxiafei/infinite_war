import { CreepConstants, GameConstants } from "../constant/constants";
import { modifier_creep_move } from "../modifier/modifier_creep_move";
import { MapUtil } from "../util/map_util";
import { TableUtil } from "../util/table_util";


export class CreepHandler {
    private mapUtil: MapUtil = new MapUtil();
    private tableUtil: TableUtil = new TableUtil();
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
        const unit = this.CreateCreepBasedOnEntityName("creep_zeus", CreepConstants.CreepOriginPosition);
        unit.AddNewModifier(unit, undefined, modifier_creep_move.name, {duration: -1});
        TableUtil.Creep2Step.set(unit, 0);
    }

    public GenerateSummonedCreep(): void {
        print("summoned creep");
    }

    public CreateCreepBasedOnEntityName(creepName: string, entityName: string): CDOTA_BaseNPC {
        const entity = Entities.FindByName(undefined, entityName) as CDOTA_BaseNPC;
        const pos = entity.GetCenter();
        const unit = CreateUnitByName(creepName, pos, false, undefined, undefined, DotaTeam.BADGUYS) as CDOTA_BaseNPC;
        return unit;
    }
}