import { ipcMain } from "electron";
import { manager } from '.';
import { getAll } from './wrappers';
import { createNew } from './wrappers';

/*
const getRooms = (): void => {
    ipcMain.handle('retrieve-rooms', async () => {
        // const rooms = await prisma.room.findMany();
        // return rooms;
    });
}
*/

const getAllquery = "SELECT * FROM room";

const getRooms = (): void => {
    ipcMain.on('retrieve-rooms', async (e) => {
        const rooms: any[] = await getAll(getAllquery);
         //console.log(students);
        
        e.returnValue = {
            rooms
        };
    });
}

const createRoomquery = "INSERT INTO room(type, name, roomSize, hasPiano) VALUES (?, ?, ?, ?)";


const createRoom = (roomParams: String[]): void => {
    ipcMain.on('create-room', async (e) => {
        createNew(createRoomquery, roomParams);
        // console.log(students);

        
    });
}

export { getRooms, createRoom };
