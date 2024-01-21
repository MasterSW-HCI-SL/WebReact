import { t, StateMachine } from "typescript-fsm";
import { Events, States, EventLibrary } from "./configuration";



export class FiniteStateMachine extends StateMachine<States, Events>  {
    private readonly wordFoundCallback: (label: string) => void | undefined;

    constructor(wordFoundCallback: (label: string) => void, init = States.Start) {
        super(init);
        this.wordFoundCallback = wordFoundCallback;
        this.addTransitions([
            /* fromState        event                 toState         callback */
            t(States.Knee3,    Events.restart,       States.Start, () => console.log("Restarted")),

            t(States.Start,    Events.StartKnee,       States.Knee1, () => console.log("First sign of knee")),
            t(States.Knee1,       Events.KneeMiddle,       States.Knee2, () => console.log("Second sign of knee")),
            t(States.Knee2,       Events.KneeEnd,       States.Knee3, async () => this.wordFound("Knee")),

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