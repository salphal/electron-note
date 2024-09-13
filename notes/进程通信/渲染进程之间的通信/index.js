const { ipcMain, BrowserWindow } = require('electron');
const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ htmlPath: './index1.html' });
  const win2 = app.createWindow({ htmlPath: './index2.html' });
});

ipcMain.on('get-touch-window', (event) => {
  /**
   * 获取触发该事件的 渲染进程
   */
  const win = BrowserWindow.fromWebContents(event.sender);
});
