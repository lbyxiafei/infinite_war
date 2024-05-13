import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";
import { CreepConstants } from "../constant/constants";
import { TowerHandler } from "../tower/tower_handler";

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
    towerUtil: TowerHandler = new TowerHandler();

    // Set state
    CheckState(): Partial<Record<modifierstate, boolean>> {
        return {
            [ModifierState.COMMAND_RESTRICTED]: true,
        };
    }

    // Override speed given by Modifier_Speed
    GetModifierMoveSpeed_Absolute(): number {
        return 540;
    }

    // Run when modifier instance is created
    OnCreated(): void {
        if (IsServer()) {
            // Think every 0.3 seconds
            this.StartIntervalThink(0.3);
        }
    }

    // Called when intervalThink is triggered
    OnIntervalThink(): void {
        const unit = this.GetParent();
        print("hi", unit);

        this.MoveToNextPos(unit);
        // parent.MoveToPosition((parent.GetAbsOrigin() + RandomVector(400)) as Vector);
    }

    MoveToNextPos(unit: CDOTA_BaseNPC): void {
        const n = CreepConstants.Route.length;
        let idx: number = -1;
        if(CreepConstants.Creep2Step.has(unit)) {
            idx = CreepConstants.Creep2Step.get(unit) ?? -1;
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
}
