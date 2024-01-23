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


            t(States.Start,    Events.StartJeg,       States.Peg3, () => console.log("First sign of Jeg")),
            t(States.Peg3,       Events.JegEnd,       States.Peg4, async () => this.wordFound("Jeg")),

            t(States.Start,    Events.StartHaft,      States.Kh3, () => console.log("First sign of Haft")),
            t(States.Kh3,       Events.HaftEnd,       States.Peg1, async () => this.wordFound("Haft")),

            t(States.Start,    Events.StartHKnuckle, States.HKnuckle, () => console.log("First sign of HKnuckle")),
            t(States.HKnuckle, Events.HKnuckleMiddle, States.HKnuckle2, () => console.log("Second sign of HKnuckle")),
            t(States.HKnuckle2,Events.HKnuckleEnd,    States.HKnuckle3, async () => this.wordFound("Feber")),

            t(States.Start,    Events.StartVomit,     States.Vomit1, () => console.log("First sign of Vomit")),
            t(States.Vomit1,    Events.VomitEnd,      States.Vomit2, async () => this.wordFound("Kaste op")),

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