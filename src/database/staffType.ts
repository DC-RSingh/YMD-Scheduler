import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM staffType";

const getStaffTypes = (): void => {
    ipcMain.on('retrieve-staffType', async (e) => {
        const staffType: any[] = await getAll(getAllquery);
         console.log(staffType);
        
        e.returnValue = {
            staffType
        };
    });
}

const getSelectedquery = "SELECT * FROM staffType WHERE id=?";

const getStaffTypeId = (): void => {
    ipcMain.on('retrieve-staffTypeId', async (e, param) => {
        const staffType: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffType
        };
    });
}

const createStaffTypequery = "INSERT INTO staff(type) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffType = (): void => {
    ipcMain.on('create-staffType', async (e, staffTypeParams) => {
        createNew(createStaffTypequery, staffTypeParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM staffType WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffType = (): void => {
    ipcMain.on('delete-staffType', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staffType SET type=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffType = (): void => {
    ipcMain.on('update-staffType', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getStaffTypes, createStaffType, deleteStaffType, updateStaffType, getStaffTypeId };
