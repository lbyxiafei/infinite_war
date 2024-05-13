import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";
import { CreepConstants } from "../constant/constants";
import { MapUtil } from "../util/map_util";
import { TableUtil } from "../util/table_util";

// Base speed modifier -- Could be moved to a separate file
class ModifierSpeed extends BaseModifier {
    // Declare functions
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.MOVESPEED_ABSOLUTE];
    }

    GetModifierMoveSpeed_Absolute(): number {
        return 300;
    }
}

@registerModifier()
export class modifier_panic extends ModifierSpeed {
    mapUtil: MapUtil = new MapUtil();

    // Set state
    CheckState(): Partial<Record<modifierstate, boolean>> {
        return {
            [ModifierState.COMMAND_RESTRICTED]: true,
        };
    }

    // Override speed given by Modifier_Speed
    GetModifierMoveSpeed_Absolute(): number {
        return 300;
    }

    // Run when modifier instance is created
    OnCreated(): void {
        if (IsServer()) {
            this.StartIntervalThink(0.1);
        }
    }

    // Called when intervalThink is triggered
    OnIntervalThink(): void {
        const unit = this.GetParent();
        this.MoveToNextPos(unit);
    }

    MoveToNextPos(unit: CDOTA_BaseNPC): void {
        const n = CreepConstants.Route.length;
        let idx: number = -1;
        if(TableUtil.Creep2Step.has(unit)) {
            idx = TableUtil.Creep2Step.get(unit) ?? -1;
        }
        if(idx===-1) {
            print("creep pos wrong");
            DeepPrintTable(TableUtil.Creep2Step);
        } else if(idx===n-1) {
            TableUtil.Creep2Step.delete(unit);
            unit.Destroy();
            // todo(binyan.li):
            print("hp--");
        } else {
            const curPos = unit.GetAbsOrigin();
            const curEnt = this.mapUtil.FindEntityBasedOnPos(curPos);
            if(CreepConstants.Route[idx]===curEnt.GetName()) {
                const nxtEntName = CreepConstants.Route[idx+1];
                const entity = Entities.FindByName(undefined, nxtEntName) as CDOTA_BaseNPC;
                const nxtPos = entity.GetCenter();
                unit.MoveToPosition(nxtPos);
                TableUtil.Creep2Step.set(unit, idx+1);
            }
        }
    }
}
