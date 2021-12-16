import { app, BrowserWindow, ipcMain, } from 'electron';
import isDev from "electron-is-dev";
import { copyFileSync, constants } from 'fs';
import { join } from 'path';
import * as db from './database';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

const dbPath = isDev ? join(__dirname, '../prisma/ymd-db.db') : join(app.getPath("userData"), "ymd-db.db");

// Open the connection with the SQLite3 Database
db.manager.open('prisma/ymd-db.db');   // need dynamic path

const MIN_HEIGHT = 860;
const MIN_WIDTH = 1280;

// Whether this instance of the application is the only one
const gotTheLock = app.requestSingleInstanceLock();

let mainWindow: BrowserWindow;

// Disable security warnings that result from disabling webSecurity in webPreferences
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

if (!isDev) {
    try {
        // If the database file does not exist, create it
        copyFileSync(join(process.resourcesPath, '../prisma/ymd-db.db'), dbPath, constants.COPYFILE_EXCL);
    } catch (_) {
        // no op
    }
}

const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        minHeight: MIN_HEIGHT,
        minWidth: MIN_WIDTH,
        resizable: true,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Perform once the window is ready to show
    mainWindow.once('ready-to-show', () => {
        mainWindow.setSize(MIN_WIDTH, MIN_HEIGHT);
        mainWindow.center();
        mainWindow.show();

        if (isDev) {
            // Open the DevTools.
            mainWindow.webContents.openDevTools();
        }
        else {  
            // remove menu bar in productiona
            mainWindow.removeMenu();
        }
    });

    ipcMain.on('app-globals', (e) => {

        e.returnValue = {
            dbPath
        }
    })

    // Student Channels
    db.getStudents();
    db.createStudent();

    // Room Channels
    db.getRooms();
    db.getRoomId();
    db.createRoom();

    db.getRoomTypes();
    db.getRoomTypeId();
    db.createRoomType();

    // Staff Channels
    db.getStaff();
    db.createStaff();

    db.getStaffId();
    db.getStaffTypeId();
    db.getStaffTypes();
    db.createStaffType();

    // Music Class Channels
    db.getMusicClasses();
    db.getTimeSlots();
    db.getTimeSlotId();

    // Skill Channels
    db.getSkillId();

};

// If another app has the lock, quit this instance
if (!gotTheLock) {
    app.quit();
} else {
    // Focus the instance that was already running
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }

    // If no instance is running, create a window
    
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
