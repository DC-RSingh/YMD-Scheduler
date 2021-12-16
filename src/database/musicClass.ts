import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM musicclass";

const getMusicClasses = (): void => {
    ipcMain.on('retrieve-musicClasses', async (e) => {
        const musicClasses: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            musicClasses
        };
    });
}

const getSelectedquery = "SELECT * FROM musicclass WHERE id=?";

const getMusicClassId = (): void => {
    ipcMain.on('retrieve-musicClass-by-id', async (e, param) => {
        const musicClass: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            musicClass
        };
    });
}

const createStaffTypequery = "INSERT INTO musicclass(classType, staffID, timeSlotId, roomId, classSize) VALUES (?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createMusicClass = (): void => {
    ipcMain.handle('create-musicClass', async (e, params) => {
        createNew(createStaffTypequery, params);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM musicclass WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteMusicClass = (): void => {
    ipcMain.on('delete-musicClass', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE musicclass SET classType=?, staffID=?, timeSlotId=?, roomId=?, classSize=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateMusicClass = (): void => {
    ipcMain.on('update-musicClass', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getMusicClasses, createMusicClass, deleteMusicClass, updateMusicClass, getMusicClassId };
