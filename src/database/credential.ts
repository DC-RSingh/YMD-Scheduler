import { ipcMain } from "electron";
import { getAll, createNew, updateSelected, deleteSelected } from './wrappers';

const getAllquery = "SELECT * FROM credentials";

const getCredentials = (): void => {
    ipcMain.on('retrieve-credentials', async (e) => {
        const credentials: any[] = await getAll(getAllquery);
        //  console.log(credentials);
        
        e.returnValue = {
            credentials
        };
    });
}

const getSelectedquery = "SELECT * FROM credentials WHERE id=?";

const getCredentialId = (): void => {
    ipcMain.on('retrieve-credential-by-id', async (e, param) => {
        const credential: any[] = await getAll(getSelectedquery, param);
         //console.log(credentials);
        
        e.returnValue = {
            credential
        };
    });
}

const createCredquery = "INSERT INTO credentials(credential) VALUES (?)";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const createCredential = (): void => {
    ipcMain.on('create-credential', async (e, credentialParams) => {
        createNew(createCredquery, credentialParams);
        // console.log(students);
    });
}

const deleteQuery = "DELETE FROM credentials WHERE id=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const deleteCredential = (): void => {
    ipcMain.on('delete-credential', async (e, credentialParams) => {
        deleteSelected(deleteQuery, credentialParams);
        // console.log(students);
    });
}

const updateQuery = "UPDATE credentials SET credential=?";

//const studentParams = ["Rob", "Smeller", "M", "07-07-2000", "RS@gmail.com", "9055556783", "Cash"];

const updateCredential = (): void => {
    ipcMain.on('update-credential', async (e, credentialParams) => {
        updateSelected(updateQuery, credentialParams);
        // console.log(students);
    });
}

export { getCredentials, createCredential, deleteCredential, updateCredential, getCredentialId };
