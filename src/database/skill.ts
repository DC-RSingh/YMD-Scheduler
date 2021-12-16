import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

const getAllquery = "SELECT * FROM skills";

const getSkill = (): void => {
    ipcMain.on('retrieve-skill', async (e) => {
        const skill: any[] = await getAll(getAllquery);
         console.log(skill);
        
        e.returnValue = {
            skill
        };
    });
}

const createSkillquery = "INSERT INTO skill(skill) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createSkill = (skillParams: String[]): void => {
    ipcMain.on('create-skill', async (e) => {
        createNew(createSkillquery, skillParams);
        // console.log(students);
    });
}

export { getSkill, createSkill };
