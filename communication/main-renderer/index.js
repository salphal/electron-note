const { app, BrowserWindow, ipcMain } = require('electron/main');
require('./src/main-process');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  win.loadFile('./public/index.html');
  // 开启控制台
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  // 兼容 mac
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
