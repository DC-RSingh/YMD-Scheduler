import { ipcMain } from "electron";
import { manager } from '.';

const getRooms = (): void => {
    ipcMain.handle('retrieve-rooms', async () => {
        // const rooms = await prisma.room.findMany();
        // return rooms;
    });
}

export { getRooms };
