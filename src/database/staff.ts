import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';
import { getSchedule } from './wrappers';

const getAllquery = "SELECT * FROM staff";

const getStaff = (): void => {
    ipcMain.on('retrieve-staff', async (e) => {
        const staff: any[] = await getAll(getAllquery);
         console.log(staff);
        
        e.returnValue = {
            staff
        };
    });
}

const createStaffquery = "INSERT INTO staff(type, firstName, lastName, gender, dateOfBirth, email, telephone, maxHoursPerWeek) VALUES (?, ?, ?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaff = (staffParams: String[]): void => {
    ipcMain.on('create-staff', async (e) => {
        createNew(createStaffquery, staffParams);
        // console.log(students);
    });
}

    const getSchedulequery = "SELECT * FROM musicclass WHERE staffId = ?";

const getStaffSchedule = (staffId: String): void => {
    ipcMain.on('retrieve-schedule', async (e) => {
        const schedule: any[] = await getSchedule(getSchedulequery, staffId);
         console.log(schedule);
        
        e.returnValue = {
            schedule
        };
    });
}

export { getStaff, createStaff, getStaffSchedule };
