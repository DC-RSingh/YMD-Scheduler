import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

const getAllquery = "SELECT * FROM staffType";

const getStaffType = (): void => {
    ipcMain.on('retrieve-staffType', async (e) => {
        const staffType: any[] = await getAll(getAllquery);
         console.log(staffType);
        
        e.returnValue = {
            staffType
        };
    });
}

const createStaffTypequery = "INSERT INTO staff(type) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffType = (staffTypeParams: String[]): void => {
    ipcMain.on('create-staffType', async (e) => {
        createNew(createStaffTypequery, staffTypeParams);
        // console.log(students);
    });
}

export { getStaffType, createStaffType };
