const { app, BrowserWindow } = require('electron');
const path = require('path');

// 创建窗口的函数
function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // 允许渲染进程访问 Node.js API
    }
  });

  // 加载 HTML 文件
  win.loadFile('index.html');
}

// Electron 初始化完成时调用
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // 当点击 Dock 图标时，如果没有窗口，重新创建一个
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // macOS 不会在窗口关闭时退出应用
    app.quit();
  }
});
