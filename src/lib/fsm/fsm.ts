import { t, StateMachine } from "typescript-fsm";
import { Events, States, EventLibrary } from "./configuration";



export class FiniteStateMachine extends StateMachine<States, Events>  {
    private readonly wordFoundCallback: (label: string) => void | undefined;

    constructor(wordFoundCallback: (label: string) => void, init = States.Start) {
        super(init);
        this.wordFoundCallback = wordFoundCallback;
        this.addTransitions([
            /* fromState        event                 toState         callback */
            t(States.I3,    Events.restart,       States.Start, () => console.log("Restarted")),

            t(States.Start,    Events.StartI1,       States.I1, () => console.log("Start -> I1")),
            t(States.I1,       Events.I1I2,       States.I2, () => console.log("I1 -> I2")),
            t(States.I2,       Events.I2I3,       States.I3, async () => this.wordFound("DETTE ER EN TEST BESKED, KUN BEREGNET TIL TESTING SAMT FOR AT SE HVAD DER SKER HVIS DEN BLIVER RIGTIG LANG")),

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