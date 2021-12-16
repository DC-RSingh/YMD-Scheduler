import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM musicClass";

const getMusicClasses = (): void => {
    ipcMain.on('retrieve-musicClass', async (e) => {
        const musicClass: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            musicClass
        };
    });
}

const getSelectedquery = "SELECT * FROM musicClass WHERE id=?";

const getMusicClassId = (): void => {
    ipcMain.on('retrieve-musicClass-by-id', async (e, param) => {
        const musicClass: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            musicClass
        };
    });
}

const createStaffTypequery = "INSERT INTO musicClass(classType, staffID, timeSlotId, roomId, classSize) VALUES (?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createMusicClass = (): void => {
    ipcMain.handle('create-musicClass', async (e, params) => {
        createNew(createStaffTypequery, params);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM musicClass WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteMusicClass = (): void => {
    ipcMain.on('delete-musicClass', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE musicClass SET classType=?, staffID=?, timeSlotId=?, roomId=?, classSize=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateMusicClass = (): void => {
    ipcMain.on('update-musicClass', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getMusicClasses, createMusicClass, deleteMusicClass, updateMusicClass, getMusicClassId };
