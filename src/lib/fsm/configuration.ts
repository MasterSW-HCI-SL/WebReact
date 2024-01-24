import Labels from "./labels";

enum States {Start = 0,
    Peg3 = 1, Peg4 = 2,
    Kh3 = 3, Peg1 = 4,
    HKnuckle = 5, HKnuckle2 = 6, HKnuckle3 = 7,
    Vomit1 = 8, Vomit2 = 9,
    MediRightOk = 10, MediLeftKnuckle = 11,
    Give1 = 12, Give2 = 13,
    Kan1 = 14, Kan2 = 15,
    Skal1 = 16, Skal2 = 17,
    PegDu = 18,
    Tage1 = 19, Tage2 = 20,
    Apotek1 = 21, Apotek2 = 22, Apotek3 = 23,
    Tak1 = 24, Tak2 = 25, Tak3 = 26,
    Help1 = 27, Help2 = 28,
}

enum Events {
    StartJeg = 0, JegEnd = 1,
    StartHaft = 2, HaftEnd = 3,
    StartHKnuckle = 4, HKnuckleMiddle = 5, HKnuckleEnd = 6,
    StartVomit = 7, VomitEnd = 8,
    StartMedi = 9, MediEnd = 10,
    StartDu = 11, DuEnd = 12,
    StartGive = 13, GiveEnd = 14,
    StartKan = 15, KanEnd = 16,
    StartSkal = 17, SkalEnd = 18,
    StartTage = 19, TageEnd = 20,
    StartApotek = 21, ApotekMiddle = 22, ApotekEnd = 23,
    StartTak = 24, TakMiddle = 25, TakEnd = 26,
    StartHelp = 27, HelpEnd = 28,
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
    " - Right:MediRightOk" : Events.StartMedi,
    "Left:MediLeftKnuckle - Right:MediRightOk" : Events.MediEnd,
    "Left:PegDu - " : Events.StartDu,
    "Left:PegDu - Right:StopR" : Events.DuEnd,
    "Left:Give1Left - Right:Give1Right" : Events.StartGive,
    "Left:Give2Left - Right:Give2Right" : Events.GiveEnd,
    " - Right:Kan1" : Events.StartKan,
    "Left:StopL - Right:Kan2" : Events.KanEnd,
    " - Right:Skal1" : Events.StartSkal,
    "Left:StopL - Right:Skal2" : Events.SkalEnd,
    "Left:Tage1 - " : Events.StartTage,
    "Left:Tage2 - Right:StopR" : Events.TageEnd,
    " - Right:Apotek1" : Events.StartApotek,
    " - Right:Apotek2" : Events.ApotekMiddle,
    "Left:StopL - Right:Apotek3" : Events.ApotekEnd,
    "Left:Tak1 - " : Events.StartTak,
    "Left:Tak2 - " : Events.TakMiddle,
    "Left:Tak3 - Right:StopR" : Events.TakEnd,
    "Left:Help1Left - Right:Help1Right" : Events.StartHelp,
    "Left:Help2Left - Right:Help2Right" : Events.HelpEnd,
}

export { States, Events, EventLibrary };