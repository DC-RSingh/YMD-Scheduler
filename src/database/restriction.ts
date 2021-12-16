import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM restrictions";

const getRestrictions = (): void => {
    ipcMain.on('retrieve-restrictions', async (e) => {
        const restrictions: any[] = await getAll(getAllquery);
        //  console.log(restrictions);
        
        e.returnValue = {
            restrictions
        };
    });
}

const getSelectedquery = "SELECT * FROM restrictions WHERE id=?";

const getRestrictionId = (): void => {
    ipcMain.on('retrieve-restriction-by-id', async (e, param) => {
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
    ipcMain.handle('create-restriction', async (e, restrictionParams) => {
        createNew(createRestrictionquery, restrictionParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM restrictions WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteRestriction = (): void => {
    ipcMain.on('delete-restriction', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE restrictions SET restriction=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateRestriction = (): void => {
    ipcMain.on('update-restriction', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getRestrictions, createRestriction, deleteRestriction, updateRestriction, getRestrictionId };
