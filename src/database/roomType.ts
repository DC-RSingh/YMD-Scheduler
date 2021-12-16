import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

const getAllquery = "SELECT * FROM roomType";

const getRoomType = (): void => {
    ipcMain.on('retrieve-roomType', async (e) => {
        const roomType: any[] = await getAll(getAllquery);
         console.log(roomType);
        
        e.returnValue = {
            roomType
        };
    });
}

const createRoomTypequery = "INSERT INTO roomType(type) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createRoomType = (roomTypeParams: String[]): void => {
    ipcMain.on('create-roomType', async (e) => {
        createNew(createRoomTypequery, roomTypeParams);
        // console.log(students);
    });
}

export { getRoomType, createRoomType };
