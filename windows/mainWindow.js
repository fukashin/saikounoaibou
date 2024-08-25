const { BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // これで安全に使えます
      enableRemoteModule: false,
      nodeIntegration: false   // セキュリティのため無効化
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

module.exports = createWindow;
