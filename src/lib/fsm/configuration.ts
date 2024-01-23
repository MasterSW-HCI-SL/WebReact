import Labels from "./labels";

enum States {Start = 0,
    Peg3 = 1, Peg4 = 2,
    Kh3 = 3, Peg1 = 4,
    HKnuckle = 5, HKnuckle2 = 6, HKnuckle3 = 7,
    Vomit1 = 8, Vomit2 = 9
}

enum Events {
    StartJeg = 0, JegEnd = 1,
    StartHaft = 2, HaftEnd = 3,
    StartHKnuckle = 4, HKnuckleMiddle = 5, HKnuckleEnd = 6,
    StartVomit = 7, VomitEnd = 8,
    restart = 99,
}

type EventLib = {
    [key: string]: Events;
}

const EventLibrary : EventLib = {
    " - Right:Peg3" : Events.StartJeg,
    "Left:StopL - Right:Peg4" : Events.JegEnd,
    " - Right:Kh3" : Events.StartHaft,
    "Left:StopL - Right:Peg1" : Events.HaftEnd,
    " - Right:HKnuckle" : Events.StartHKnuckle,
    " - Right:HKnuckle2" : Events.HKnuckleMiddle,
    "Left:StopL - Right:HKnuckle" : Events.HKnuckleEnd,
    " - Right:HFladHori" : Events.StartVomit,
    " - Right:HFladHori2" : Events.VomitEnd,

}

export { States, Events, EventLibrary };