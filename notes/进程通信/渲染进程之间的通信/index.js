const { App } = require('../../../utils/app');
const { ipcMain } = require('electron');
const { mainChannel } = require('./constant');

const app = new App();

const win2 = app.addWindow({ htmlPath: './index2.html' });
const win1 = app.addWindow({ htmlPath: './index1.html' });

ipcMain.on(mainChannel, (event, ...params) => {
  console.log('=>(index.js:11) event', event);
  console.log('=>(index.js:11) params', params);
  const [action, message] = params;
  const webContentId = event.sender.id;
  console.log('=>(index.js:14) webContentId', webContentId);

  // try {
  //   const channelId = event.sender.id;
  //   registerChannel(channelId, channel);
  // } catch (err) {
  //   console.error(err);
  // }
});

const channelRecord = {};

function registerChannel(id, channel) {}
