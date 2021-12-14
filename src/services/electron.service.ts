const { webFrame, ipcRenderer, shell, BrowserWindow, clipboard } = window.require('electron');

export const electronService = {
  BrowserWindow,
  ipcRenderer,
  webFrame,
  shell,
  clipboard,
};
