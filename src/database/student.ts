import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

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

const createStudentquery = "INSERT INTO students(firstName, lastName, gender, dateOfBirth, contactEmail, contactTelephone, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStudent = (): void => {
    ipcMain.on('create-student', async (e, studentParams) => {
        createNew(createStudentquery, studentParams);
        // console.log(students);

        
    });
}

//createStudent(["Mark", "Cuban", "M", "07-07-2000", "MC@gmail.com", "9995551234", "Cash"]);

export { getStudents, createStudent };
