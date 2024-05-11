$.Msg("Top Bar UI loaded");


class TopBarUI {
    panel: Panel;
    countLable: LabelPanel;
    timeLable: LabelPanel;

    constructor(panel: Panel) {
        this.panel = panel;
        this.countLable = panel.FindChildTraverse("RoundCnt") as LabelPanel;
        this.timeLable = panel.FindChildTraverse("RoundTime") as LabelPanel;

        GameEvents.Subscribe("creep_round_count", (data: NetworkedData<CreepRoundCount>) => {
            this.OnCreepRoundCountChanged(data);
        });

        GameEvents.Subscribe("creep_round_time", (data: NetworkedData<CreepRoundTime>) => {
            this.OnCreepRoundTimeChanged(data);
        });
    }

    OnCreepRoundCountChanged(event: CreepRoundCount): void {
        this.countLable.text = "当前回合：" + event.round_cnt;
    }

    OnCreepRoundTimeChanged(event: CreepRoundTime): void {
        this.timeLable.text = "剩余时间：" + event.time_left;
    }
}

let topbar = new TopBarUI($.GetContextPanel());