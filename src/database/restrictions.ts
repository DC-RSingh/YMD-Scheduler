import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

const getAllquery = "SELECT * FROM restrictions";

const getRestriction = (): void => {
    ipcMain.on('retrieve-restrictions', async (e) => {
        const restrictions: any[] = await getAll(getAllquery);
         console.log(restrictions);
        
        e.returnValue = {
            restrictions
        };
    });
}

const createRestrictionquery = "INSERT INTO restrictions(restrictions) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createRestriction = (restrictionParams: String[]): void => {
    ipcMain.on('create-restriction', async (e) => {
        createNew(createRestrictionquery, restrictionParams);
        // console.log(students);
    });
}

export { getRestriction, createRestriction };
