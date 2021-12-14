import { prisma } from "../services/prisma.service";
import { ipcMain } from "electron";

const getRooms = (): void => {
    ipcMain.handle('retrieve-rooms', async () => {
        const rooms = await prisma.room.findMany();
        return rooms;
    });
}

export { getRooms };
