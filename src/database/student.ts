import { prisma } from "../services/prisma.service";
import { ipcMain } from "electron";

const getStudents = (): void => {
    ipcMain.handle('retrieve-students', async () => {
        const students = await prisma.students.findMany();
        return students;
    });
}

export { getStudents };
