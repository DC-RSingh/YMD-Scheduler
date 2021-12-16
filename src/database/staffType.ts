import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM stafftype";

const getStaffTypes = (): void => {
    ipcMain.on('retrieve-staffType', async (e) => {
        const staffType: any[] = await getAll(getAllquery);
         console.log(staffType);
        
        e.returnValue = {
            staffType
        };
    });
}

const getSelectedquery = "SELECT * FROM stafftype WHERE id=?";

const getStaffTypeId = (): void => {
    ipcMain.on('retrieve-staffType-by-id', async (e, param) => {
        const staffType: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffType
        };
    });
}

const createStaffTypequery = "INSERT INTO stafftype(type) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffType = (): void => {
    ipcMain.on('create-staffType', async (e, staffTypeParams) => {
        createNew(createStaffTypequery, staffTypeParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM stafftype WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffType = (): void => {
    ipcMain.on('delete-staffType', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE stafftype SET type=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffType = (): void => {
    ipcMain.on('update-staffType', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getStaffTypes, createStaffType, deleteStaffType, updateStaffType, getStaffTypeId };
