const activeWindow = require('electron-active-window');
const Activity = require('../db/models/Activity');

let currentWindow = null;
let lastCheckTime = Date.now();

function startActiveWindowMonitoring() {
  setInterval(async () => {
    const now = Date.now();
    const deltaTime = now - lastCheckTime;
    lastCheckTime = now;

    try {
      const result = await activeWindow().getActiveWindow();
      if (result) {
        const windowName = result.windowName || 'Unknown';

        if (currentWindow === windowName) {
          const activity = await Activity.findOne({ where: { windowName } });
          if (activity) {
            activity.activeTime += deltaTime;
            await activity.save();
          } else {
            await Activity.create({ windowName, activeTime: deltaTime });
          }
        } else {
          currentWindow = windowName;
          const activity = await Activity.findOne({ where: { windowName } });
          if (!activity) {
            await Activity.create({ windowName, activeTime: 0 });
          }
        }

        console.log(`Active window title: ${windowName}`);
        const activity = await Activity.findOne({ where: { windowName } });
        console.log(`Active time: ${activity.activeTime} ms`);
      } else {
        console.log('No active window found');
      }
    } catch (err) {
      console.error('Error getting active window:', err);
    }
  }, 1000);
}

module.exports = startActiveWindowMonitoring;
