export interface ITimeSlot {
    Id:             number;
    StartDate:      string;
    EndDate:        string;
    Duration?:      number;
    WeekDay?:       number;
    Attended?:      boolean;
}