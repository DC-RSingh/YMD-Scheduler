import { ipcMain } from "electron";
import { getAll } from './wrappers';

const getAllquery = "SELECT * FROM students";

const getStudents = (): void => {
    ipcMain.on('retrieve-students', async (e) => {
        const students: any[] = await getAll(getAllquery);
        // console.log(students);
        
        e.returnValue = {
            students
        };
    });
}

export { getStudents };
