import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

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

const getSelectedquery = "SELECT * FROM room WHERE id=?";

const getRoomId = (): void => {
    ipcMain.on('retrieve-room-by-id', async (e, param) => {
        const room: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            room
        };
    });
}


const createRoomquery = "INSERT INTO room(type, name, roomSize, hasPiano) VALUES (?, ?, ?, ?)";

const createRoom = (): void => {
    ipcMain.handle('create-room', async (e, roomParams) => {
        createNew(createRoomquery, roomParams);
        // console.log(students);

        
    });
}

const deleteQuery = "DELETE FROM room WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteRoom = (): void => {
    ipcMain.on('delete-room', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE room SET type=?, name=?, roomSize=?, hasPiano=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateRoom = (): void => {
    ipcMain.on('update-room', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getRooms, createRoom, deleteRoom, updateRoom, getRoomId };
