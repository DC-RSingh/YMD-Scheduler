import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM studentClassList";

const getStudentClassList = (): void => {
    ipcMain.on('retrieve-studentClassList', async (e) => {
        const studentClassList: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            studentClassList
        };
    });
}

const getSelectedquery = "SELECT * FROM studentClassList WHERE id=?";

const getStudentClassListId = (): void => {
    ipcMain.on('retrieve-studentClassList-by-id', async (e, param) => {
        const studentClassList: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            studentClassList
        };
    });
}

const createStaffTypequery = "INSERT INTO studentClassList(classId, studentId) VALUES (?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStudentClassList = (): void => {
    ipcMain.on('create-studentClassList', async (e, params) => {
        createNew(createStaffTypequery, params);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM studentClassList WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStudentClassList = (): void => {
    ipcMain.on('delete-studentClassList', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE studentClassList SET classId=?, studentId=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStudentClassList = (): void => {
    ipcMain.on('update-studentClassList', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getStudentClassList, createStudentClassList, deleteStudentClassList, updateStudentClassList, getStudentClassListId };
