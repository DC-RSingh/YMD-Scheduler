const { webFrame, ipcRenderer, shell, BrowserWindow, clipboard } = window.require('electron');

const { dbPath } = ipcRenderer.sendSync('app-globals', '');

export const electronService = {
  BrowserWindow,
  ipcRenderer,
  webFrame,
  shell,
  clipboard,
  dbPath
};
