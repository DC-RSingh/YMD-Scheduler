import { ipcMain } from "electron";
import { getAll } from './wrappers';
import { createNew } from './wrappers';

const getAllquery = "SELECT * FROM credentials";

const getCredential = (): void => {
    ipcMain.on('retrieve-credentials', async (e) => {
        const credentials: any[] = await getAll(getAllquery);
         console.log(credentials);
        
        e.returnValue = {
            credentials
        };
    });
}

const createCredquery = "INSERT INTO credentials(credentials) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createCredential = (credentialParams: String[]): void => {
    ipcMain.on('create-credential', async (e) => {
        createNew(createCredquery, credentialParams);
        // console.log(students);
    });
}

export { getCredential, createCredential };
