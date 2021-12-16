import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "./rootStore";
import { electronService } from "../../services/electron.service";
import { IMusicClass } from "../../interfaces/musicClass.interface";
import { ITimeSlot } from "../../interfaces/timeSlot.interface";
import { convertUnixTimeStamp } from "../../utils/helper.utils";
import { IAppointments } from "../../interfaces/appointments.interface";

// should be joining but that's later endeavour

export class MusicClassStore {
    @observable newClassesThisSession = 0;

    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }

    @action incrementNewClasses(): void {
        this.newClassesThisSession++;
    }


    getMusicClassData(): IMusicClass[] {
        const { musicClasses } = electronService.ipcRenderer.sendSync('retrieve-musicClasses');

        return musicClasses;
    }

    getTimeSlotById(value: any): ITimeSlot {
        const { timeslot } = electronService.ipcRenderer.sendSync('retrieve-timeSlot-by-id', value);

        return timeslot[0];
    }

    getSchedulerData(): IAppointments[] {
        const musicClassData = this.getMusicClassData();
        const schedulerData: IAppointments[] = [];

        musicClassData.forEach(mc => {
            console.log(mc);
            const room = this.rootStore.roomStore.getRoomById(mc.RoomId);
            const staff = this.rootStore.staffStore.getStaffById(mc.StaffId);
            const timeslot = this.getTimeSlotById(mc.TimeSlotId);
            const startDate = convertUnixTimeStamp(timeslot.StartDate);
            const endDate = convertUnixTimeStamp(timeslot.EndDate);
            
            schedulerData.push({text: `${room.Name}: ${staff.FirstName} ${staff.LastName}'s class`, startDate: startDate, endDate: endDate})
        });

        return schedulerData;
    }
}