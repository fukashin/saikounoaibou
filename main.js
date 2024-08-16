const { app } = require('electron');
const createWindow = require('./windows/mainWindow');
const startActiveWindowMonitoring = require('./services/activeWindowService');
const sequelize = require('./db');

async function initializeApp() {
  try {
    console.log('Initializing database connection...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    createWindow();
    startActiveWindowMonitoring();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.on('ready', initializeApp);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
