const { MessageChannelMain } = require('electron');
const { App } = require('../../../utils/app');

const app = new App();

const win2 = app.addWindow({ htmlPath: './index2.html' });
const win1 = app.addWindow({ htmlPath: './index1.html' });

// 建立通道
const { port1, port2 } = new MessageChannelMain();

win1.once('ready-to-show', () => {
  win1.webContents.postMessage('port', null, [port1]);
});

win2.once('ready-to-show', () => {
  win2.webContents.postMessage('port', null, [port2]);
});
