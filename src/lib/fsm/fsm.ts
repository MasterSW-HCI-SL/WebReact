import { t, StateMachine } from "typescript-fsm";
import { Events, States, EventLibrary } from "./configuration";



export class FiniteStateMachine extends StateMachine<States, Events>  {
    private readonly wordFoundCallback: (label: string) => void | undefined;

    constructor(wordFoundCallback: (label: string) => void, init = States.Start) {
        super(init);
        this.wordFoundCallback = wordFoundCallback;
        this.addTransitions([
            /* fromState        event                 toState         callback */
            t(States.Peg4,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Peg1,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.HKnuckle3,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Vomit2,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.MediLeftKnuckle,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.PegDu,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Give2,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Kan2,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Skal2,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Tage2,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Apotek3,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Tak3,    Events.restart,       States.Start, () => console.log("Restarted")),
            t(States.Help2,    Events.restart,       States.Start, () => console.log("Restarted")),


            t(States.Start,    Events.StartJeg,       States.Peg3, () => console.log("First sign of Jeg")),
            t(States.Peg3,       Events.JegEnd,       States.Peg4, async () => this.wordFound("Jeg")),

            t(States.Start,    Events.StartHaft,      States.Kh3, () => console.log("First sign of Haft")),
            t(States.Kh3,       Events.HaftEnd,       States.Peg1, async () => this.wordFound("Haft")),

            t(States.Start,    Events.StartHKnuckle, States.HKnuckle, () => console.log("First sign of HKnuckle")),
            t(States.HKnuckle, Events.HKnuckleMiddle, States.HKnuckle2, () => console.log("Second sign of HKnuckle")),
            t(States.HKnuckle2,Events.HKnuckleEnd,    States.HKnuckle3, async () => this.wordFound("Feber")),

            t(States.Start,    Events.StartVomit,     States.Vomit1, () => console.log("First sign of Vomit")),
            t(States.Vomit1,    Events.VomitEnd,      States.Vomit2, async () => this.wordFound("Kaste op")),

            t(States.Start,    Events.StartMedi,      States.MediRightOk, () => console.log("First sign of Medi")),
            t(States.MediRightOk,    Events.MediEnd,      States.MediLeftKnuckle, async () => this.wordFound("Medicin")),

            t(States.Start,    Events.StartDu,        States.PegDu, () => console.log("First sign of Du")),
            t(States.PegDu,    Events.DuEnd,          States.Start, async () => this.wordFound("Du")),

            t(States.Start,    Events.StartGive,      States.Give1, () => console.log("First sign of Give")),
            t(States.Give1,    Events.GiveEnd,        States.Give2, async () => this.wordFound("Give")),

            t(States.Start,    Events.StartKan,       States.Kan1, () => console.log("First sign of Kan")),
            t(States.Kan1,     Events.KanEnd,         States.Kan2, async () => this.wordFound("Kan")),

            t(States.Start,    Events.StartSkal,      States.Skal1, () => console.log("First sign of Skal")),
            t(States.Skal1,    Events.SkalEnd,        States.Skal2, async () => this.wordFound("Skal")),

            t(States.Start,    Events.StartTage,      States.Tage1, () => console.log("First sign of Tage")),
            t(States.Tage1,    Events.TageEnd,        States.Tage2, async () => this.wordFound("Tage")),

            t(States.Start,    Events.StartApotek,    States.Apotek1, () => console.log("First sign of Apotek")),
            t(States.Apotek1,    Events.ApotekMiddle,    States.Apotek2, () => console.log("Second sign of Apotek")),
            t(States.Apotek2,    Events.ApotekEnd,       States.Apotek3, async () => this.wordFound("Apotek")),

            t(States.Start,    Events.StartTak,       States.Tak1, () => console.log("First sign of Tak")),
            t(States.Tak1,    Events.TakMiddle,       States.Tak2, () => console.log("Second sign of Tak")),
            t(States.Tak2,    Events.TakEnd,          States.Tak3, async () => this.wordFound("Tak")),

            t(States.Start,    Events.StartHelp,      States.Help1, () => console.log("First sign of Help")),
            t(States.Help1,    Events.HelpEnd,        States.Help2, async () => this.wordFound("Hjælp")),

        ]);

    }

    private async wordFound(label: string) {
        this.wordFoundCallback(label);
        await this.dispatch(Events.restart)
    }

    public async takeStep (label:string) {
        const event:Events = EventLibrary[label]
        try {
            await this.dispatch(event);
        } catch (error) {
            //await this.dispatch(Events.restart);

        }
    }

    


}

export default FiniteStateMachine;