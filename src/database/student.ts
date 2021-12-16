import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { deleteSelected } from './wrappers';
import { updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM students";

const getStudents = (): void => {
    ipcMain.on('retrieve-students', async (e) => {
        const students: any[] = await getAll(getAllquery);
         console.log(students);
        
        e.returnValue = {
            students
        };
    });
}

const getSelectedquery = "SELECT * FROM students WHERE id=?";

const getStudentId = (): void => {
    ipcMain.on('retrieve-studentId', async (e, param) => {
        const student: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            student
        };
    });
}

const createStudentquery = "INSERT INTO students(firstName, lastName, gender, dateOfBirth, contactEmail, contactTelephone, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStudent = (): void => {
    ipcMain.on('create-student', async (e, studentParams) => {
        createNew(createStudentquery, studentParams);
        // console.log(students);

        
    });
}

const deleteQuery = "DELETE FROM students WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStudent = (): void => {
    ipcMain.on('delete-student', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        //console.log(students);
    });
}

const updateQuery = "UPDATE student SET firstName=?, lastName=?, gender=?, dateOfBirth=?, contactEmail=?, contactTelephone=?, paymentMethod=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStudent = (): void => {
    ipcMain.on('update-student', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

//createStudent(["Mark", "Cuban", "M", "07-07-2000", "MC@gmail.com", "9995551234", "Cash"]);

export { getStudents, createStudent, deleteStudent, updateStudent, getStudentId };
