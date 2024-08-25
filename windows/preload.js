// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 安全に ipcRenderer をレンダラープロセスに渡す
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
  }
});
