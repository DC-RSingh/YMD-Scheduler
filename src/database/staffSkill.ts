import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM staffSkills";

const getStaffSkills = (): void => {
    ipcMain.on('retrieve-staffSkills', async (e) => {
        const staffSkills: any[] = await getAll(getAllquery);
         //console.log(staffType);
        
        e.returnValue = {
            staffSkills
        };
    });
}

const getSelectedquery = "SELECT * FROM staffSkills WHERE id=?";

const getStaffSkillId = (): void => {
    ipcMain.on('retrieve-staffSkill-by-id', async (e, param) => {
        const staffSkill: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            staffSkill
        };
    });
}

const createStaffTypequery = "INSERT INTO staffSkills(staffId, skillId) VALUES (?, ?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createStaffSkill = (): void => {
    ipcMain.on('create-staffSkill', async (e, params) => {
        createNew(createStaffTypequery, params);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM staffSkills WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteStaffSkill = (): void => {
    ipcMain.on('delete-staffSkill', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE staffSkills SET staffId=?, skillId=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateStaffSkill = (): void => {
    ipcMain.on('update-staffSkill', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getStaffSkills, createStaffSkill, deleteStaffSkill, updateStaffSkill, getStaffSkillId };
