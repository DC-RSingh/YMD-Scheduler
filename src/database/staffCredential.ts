import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM staffCredentials";

const getStaffCredentials = (): void => {
    ipcMain.on('retrieve-staffCredentials', async (e) => {
        const staffCredentials: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            staffCredentials
        };
    });
}

const getSelectedquery = "SELECT * FROM staffCredentials WHERE id=?";

const getStaffCredentialId = (): void => {
    ipcMain.on('retrieve-staffCredentialId', async (e, param) => {
        const staffCredential: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffCredential
        };
    });
}

const createStaffTypequery = "INSERT INTO staffCredentials(staffId, credentialId) VALUES (?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffCredential = (): void => {
    ipcMain.on('create-staffCredential', async (e, staffTypeParams) => {
        createNew(createStaffTypequery, staffTypeParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM staffCredentials WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffCredential = (): void => {
    ipcMain.on('delete-staffCredential', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staffCredentials SET staffId=?, credentialId=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffCredential = (): void => {
    ipcMain.on('update-staffCredential', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getStaffCredentials, createStaffCredential, deleteStaffCredential, updateStaffCredential, getStaffCredentialId };
