import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM restrictions";

const getRestrictions = (): void => {
    ipcMain.on('retrieve-restrictions', async (e) => {
        const restrictions: any[] = await getAll(getAllquery);
         console.log(restrictions);
        
        e.returnValue = {
            restrictions
        };
    });
}

const getSelectedquery = "SELECT * FROM restrictions WHERE id=?";

const getRestrictionId = (): void => {
    ipcMain.on('retrieve-restrictionId', async (e, param) => {
        const restriction: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            restriction
        };
    });
}

const createRestrictionquery = "INSERT INTO restrictions(restrictions) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createRestriction = (): void => {
    ipcMain.on('create-restriction', async (e, restrictionParams) => {
        createNew(createRestrictionquery, restrictionParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM restrictions WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteRestriction = (): void => {
    ipcMain.on('delete-restriction', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE restrictions SET restriction=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateRestriction = (): void => {
    ipcMain.on('update-restriction', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getRestrictions, createRestriction, deleteRestriction, updateRestriction, getRestrictionId };
