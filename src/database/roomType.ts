import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM roomType";

const getRoomTypes = (): void => {
    ipcMain.on('retrieve-roomType', async (e) => {
        const roomType: any[] = await getAll(getAllquery);
         console.log(roomType);
        
        e.returnValue = {
            roomType
        };
    });
}

const getSelectedquery = "SELECT * FROM roomType WHERE id=?";

const getRoomTypeId = (): void => {
    ipcMain.on('retrieve-roomTypeId', async (e, param) => {
        const roomType: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            roomType
        };
    });
}

const createRoomTypequery = "INSERT INTO roomType(type) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createRoomType = (): void => {
    ipcMain.on('create-roomType', async (e, roomTypeParams) => {
        createNew(createRoomTypequery, roomTypeParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM roomType WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteRoomType = (): void => {
    ipcMain.on('delete-roomType', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE roomType SET type=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateRoomType = (): void => {
    ipcMain.on('update-roomType', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getRoomTypes, createRoomType, deleteRoomType, updateRoomType, getRoomTypeId };