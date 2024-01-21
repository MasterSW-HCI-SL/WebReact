import Labels from "./labels";

enum States {Start = 0,
    Knee1 = 1, Knee2 = 2, Knee3 = 3,
}

enum Events {
    StartKnee = 0, KneeMiddle = 1, KneeEnd = 2,
    restart = 99,
}

type EventLib = {
    [key: string]: Events;
}

const EventLibrary : EventLib = {
    " - Right:FladOp" : Events.StartKnee,
    " - Right:FladVandret" : Events.KneeMiddle,
    " - Right:VandOp" : Events.KneeEnd,
}

export { States, Events, EventLibrary };