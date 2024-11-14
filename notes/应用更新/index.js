const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

/**
 * 关闭自动下载更新, 防止下载失败
 */
autoUpdater.autoDownload = false;

/**
 * 当有更新的时候会触发该事件
 */
autoUpdater.on('update-available', async () => {
  const result = await dialog.showMessageBox({
    type: 'info',
    title: '发现新版本, 是否立即更新',
    buttons: ['是', '否'],
  });
  if (result.response === 0) {
    autoUpdater.downloadUpdate(); // 开始下载更新
  }
});

/**
 * 更新出错时触发
 */
autoUpdater.on('error', () => {});

/**
 * 监听下载进度
 * 每次下载进度更新的时候, 该事件会触发
 */
autoUpdater.on('download-progress', (progressInfo) => {
  console.log('=>(index.js:33) progressInfo', progressInfo.bytesPerSecond); // 下载速度，单位是字节每秒(bytes/second)
  console.log('=>(index.js:33) progressInfo', progressInfo.percent); // 下载的百分比
  console.log('=>(index.js:33) progressInfo', progressInfo.transferred); // 已下载的数据量，单位是字节(bytes)
  console.log('=>(index.js:33) progressInfo', progressInfo.total); // 文件总大小，单位是字节(bytes)
  console.log('=>(index.js:33) progressInfo', progressInfo.delta); // 这次更新中下载了多少数据
});

/**
 * 监听更新下载完成的事件
 */
autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: '安装更新',
      message: '更新下载完毕, 应用将重启并安装',
      buttons: ['是', '否'],
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

/**
 * 需要修改 package.json
 *
 *   "build": {
 *     "appId": "com.organize.name",
 *     "publish": [
 *       {
 *         "provider": "generic",               // generic 表示自定义服务器为 http/https
 *         "url": "http://localhost:3000"       // 服务器地址
 *       }
 *     ],
 *   }
 */

// 创建窗口的函数
function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 允许渲染进程访问 Node.js API
    },
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
  if (process.platform !== 'darwin') {
    // macOS 不会在窗口关闭时退出应用
    app.quit();
  }
});
