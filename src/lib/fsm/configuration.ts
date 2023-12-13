import Labels from "./labels";

enum States {Start = 0,
    I1 = 1, I2 = 2, I3 = 3,
    T1 = 4, T2 = 5, T3 = 6,
    Stop = 7,
};

enum Events {
    StartI1 = 0, I1I2 = 1, I2I3 = 2,
    StartT1 = 3, T1T2 = 4, T2T3 = 5,
    Stop = 6,
    restart = 99,
}

type EventLib = {
    [key: string]: Events;
}

const EventLibrary : EventLib = {
    " - Right:Index" : Events.StartI1,
    " - Right:IndexMiddle" : Events.I1I2,
    " - Right:IndexLast" : Events.I2I3,
}

export { States, Events, EventLibrary };