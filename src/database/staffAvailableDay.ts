import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM staffAvailableDays";

const getStaffAvailableDays = (): void => {
    ipcMain.on('retrieve-staffAvailableDays', async (e) => {
        const staffAvailableDays: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            staffAvailableDays
        };
    });
}

const getSelectedquery = "SELECT * FROM staffAvailableDays WHERE id=?";

const getStaffAvailableDaysId = (): void => {
    ipcMain.on('retrieve-staffAvailableDaysId', async (e, param) => {
        const staffAvailableDays: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffAvailableDays
        };
    });
}

const createStaffTypequery = "INSERT INTO staffAvailableDays(staffId, dayId) VALUES (?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffAvailableDays = (): void => {
    ipcMain.on('create-staffAvailableDays', async (e, staffTypeParams) => {
        createNew(createStaffTypequery, staffTypeParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM staffAvailableDays WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffAvailableDays = (): void => {
    ipcMain.on('delete-staffAvailableDays', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staffAvailableDays SET staffId=?, dayId=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffAvailableDays = (): void => {
    ipcMain.on('update-staffAvailableDays', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getStaffAvailableDays, createStaffAvailableDays, deleteStaffAvailableDays, updateStaffAvailableDays, getStaffAvailableDaysId };
