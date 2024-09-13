const { MessageChannelMain, ipcMain } = require('electron');
const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ htmlPath: './index1.html' });
  const win2 = app.createWindow({ htmlPath: './index2.html' });
});

/**
 * 在渲染进程中 创建 MessageChannel 并通信
 */
ipcMain.on('port-from-renderer', (event) => {
  const port = event.ports[0];
  port.on('message', (event) => {
    port.postMessage('reply');
  });
  port.start();
});

/**
 * 在主进程中创建 MessageChannelMain 并通信
 */
ipcMain.on('port-from-main', (event) => {
  const { port1, port2 } = new MessageChannelMain();
  event.sender.postMessage('port-from-main', null, [port2]);
  port1.on('message', (event) => {
    port1.postMessage('reply');
  });

  port1.start();
});
