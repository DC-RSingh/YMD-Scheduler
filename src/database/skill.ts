import { ipcMain } from "electron";
import { getAll, createNew, deleteSelected, updateSelected } from './wrappers';

const getAllquery = "SELECT * FROM skills";

const getSkills = (): void => {
    ipcMain.on('retrieve-skill', async (e) => {
        const skill: any[] = await getAll(getAllquery);
        //  console.log(skill);
        
        e.returnValue = {
            skill
        };
    });
}

const getSelectedquery = "SELECT * FROM skills WHERE id=?";

const getSkillId = (): void => {
    ipcMain.on('retrieve-skill-by-id', async (e, param) => {
        const skill: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            skill
        };
    });
}

const createSkillquery = "INSERT INTO skill(skill) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createSkill = (): void => {
    ipcMain.handle('create-skill', async (e, skillParams) => {
        createNew(createSkillquery, skillParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM skills WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteSkill = (): void => {
    ipcMain.on('delete-skill', async (e, params) => {
        deleteSelected(deleteQuery, params);
        // console.log(students);
    });
}

const updateQuery = "UPDATE skills SET skill=? WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateSkill = (): void => {
    ipcMain.on('update-skill', async (e, params) => {
        updateSelected(updateQuery, params);
        // console.log(students);
    });
}

export { getSkills, createSkill, deleteSkill, updateSkill, getSkillId };
