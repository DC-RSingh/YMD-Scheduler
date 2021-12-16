import { ipcMain } from "electron";
import { getAll } from './wrappers';

const getAllquery = "SELECT * FROM days";

const getDays = (): void => {
    ipcMain.on('retrieve-day', async (e) => {
        const staff: any[] = await getAll(getAllquery);
      //   console.log(staff);
        
        e.returnValue = {
            staff
        };
    });
}

const getSelectedquery = "SELECT * FROM days WHERE id=?";

const getDayId = (): void => {
    ipcMain.on('retrieve-day-by-id', async (e, param) => {
        const staff: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staff
        };
    });
}


export { getDays, getDayId };
