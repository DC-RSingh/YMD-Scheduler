import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM staffRestrictions";

const getStaffRestrictions = (): void => {
    ipcMain.on('retrieve-staffRestrictions', async (e) => {
        const staffRestrictions: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            staffRestrictions
        };
    });
}

const getSelectedquery = "SELECT * FROM staffRestrictions WHERE id=?";

const getStaffRestrictionId = (): void => {
    ipcMain.on('retrieve-staffRestriction-by-id', async (e, param) => {
        const staffRestriction: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffRestriction
        };
    });
}

const createStaffTypequery = "INSERT INTO staffRestrictions(staffId, restrictionId) VALUES (?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffRestriction = (): void => {
    ipcMain.on('create-staffRestriction', async (e, params) => {
        createNew(createStaffTypequery, params);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM staffRestrictions WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffRestriction = (): void => {
    ipcMain.on('delete-staffRestriction', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staffRestrictions SET staffId=?, restrictionId=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffRestriction = (): void => {
    ipcMain.on('update-staffRestriction', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getStaffRestrictions, createStaffRestriction, deleteStaffRestriction, updateStaffRestriction, getStaffRestrictionId };
