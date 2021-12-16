import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { getSchedule } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM timeSlot";

const getTimeSlots = (): void => {
    ipcMain.on('retrieve-timeSlot', async (e) => {
        const staff: any[] = await getAll(getAllquery);
      //   console.log(staff);
        
        e.returnValue = {
            staff
        };
    });
}

const getSelectedquery = "SELECT * FROM timeSlot WHERE id=?";

const getTimeSlotId = (): void => {
    ipcMain.on('retrieve-timeSlotId', async (e, param) => {
        const staff: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staff
        };
    });
}


export { getTimeSlots, getTimeSlotId };
