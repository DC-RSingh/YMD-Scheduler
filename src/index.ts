import { app, BrowserWindow } from 'electron';
// import ElectronLog from 'electron-log';
import isDev from "electron-is-dev";

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

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

  // Perform after the webcontents of the window have finished loading
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setSize(MIN_WIDTH, MIN_HEIGHT);
    mainWindow.center();
    mainWindow.show();

    if (isDev) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }
  });
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
