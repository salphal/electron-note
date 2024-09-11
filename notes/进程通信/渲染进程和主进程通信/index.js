const { App } = require('../../../utils/app');
const { ipcMain } = require('electron');
const { mainChannel, rendererChannel } = require('./constant');

const app = new App();

app.addWindow({ htmlPath: './index.html' });

ipcMain.on(mainChannel, (event, message) => {
  console.log(`=>(main.js:14) ${mainChannel}`, message);
  event.reply(rendererChannel, 'hi');
});
