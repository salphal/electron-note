const { App } = require('../../../utils/app');
const { ipcMain } = require('electron');
const { mainChannel, rendererChannel } = require('./constant');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ htmlPath: './index.html' });
});

ipcMain.on(mainChannel, (event, message) => {
  console.log(`=>(main.js:14) ${mainChannel}`, message);
  event.reply(rendererChannel, 'hi');
});
