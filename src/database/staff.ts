import { ipcMain } from "electron";
import { getAll, createNew, updateSelected, deleteSelected } from './wrappers';

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

const getSelectedquery = "SELECT * FROM staff WHERE id=?";

const getStaffId = (): void => {
    ipcMain.on('retrieve-staff-by-id', async (e, param) => {
        const staff: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staff
        };
    });
}

const createStaffquery = "INSERT INTO staff(type, firstName, lastName, gender, dateOfBirth, email, telephone, maxHoursPerWeek) VALUES (?, ?, ?, ?, ?, ?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaff = (): void => {
    ipcMain.on('create-staff', async (e, staffParams) => {
        createNew(createStaffquery, staffParams);
        // console.log(students);
    });
}

    const getSchedulequery = "SELECT * FROM musicclass WHERE staffId = ?";

const getStaffSchedule = (): void => {
    ipcMain.on('retrieve-staff-schedule', async (e, staffId) => {
        const schedule: any[] = await getAll(getSchedulequery, staffId);
         console.log(schedule);
        
        e.returnValue = {
            schedule
        };
    });
}


const deleteQuery = "DELETE FROM staff WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaff = (): void => {
    ipcMain.on('delete-staff', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staff SET type=?, firstName=?, lastName=?, gender=?, dateOfBirth=?, email=?, telephone=?, maxHoursPerWeek=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaff = (): void => {
    ipcMain.on('update-staff', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getStaff, createStaff, getStaffSchedule, deleteStaff, updateStaff, getStaffId };
