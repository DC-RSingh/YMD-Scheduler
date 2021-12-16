import { ipcMain } from "electron";
import { getAll } from './wrappers';

const getAllquery = "SELECT * FROM timeslot";

const getTimeSlots = (): void => {
    ipcMain.on('retrieve-timeslot', async (e) => {
        const staff: any[] = await getAll(getAllquery);
      //   console.log(staff);
        
        e.returnValue = {
            staff
        };
    });
}

const getSelectedquery = "SELECT * FROM timeslot WHERE id=?";

const getTimeSlotId = (): void => {
    ipcMain.on('retrieve-timeSlot-by-id', async (e, param) => {
        const staff: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staff
        };
    });
}


export { getTimeSlots, getTimeSlotId };
