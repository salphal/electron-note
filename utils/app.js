const { app, BrowserWindow } = require('electron/main');

class App {
  app = app;
  windowConfigList = [];
  wins = [];

  constructor(props = {}) {
    this.init();
  }

  init() {
    this._ready();
    this._closed();
  }

  _ready() {
    this.app.whenReady().then(() => {
      this.windowConfigList.forEach((options) => {
        this._createWindow(options);
      });
    });
  }

  /**
   * 当所有窗口关闭, 则退出
   */
  _closed() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  /**
   * 创建窗口
   * @param options {{[key: string]: any, htmlPath: string}} - index.html 的路径
   */
  addWindow(options) {
    console.log('=>(app.js:44) addWindow', options);
    this.windowConfigList.push(options);
  }

  /**
   * 创建窗口
   * @param options {{[key: string]: any, htmlPath: string}} - index.html 的路径
   */
  _createWindow = (options) => {
    const { htmlPath, ...restOptions } = options;

    const win = new BrowserWindow({
      width: 1000,
      height: 500,
      webPreferences: {
        nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
        contextIsolation: false, // 关闭上下文隔离
        webviewTag: true, // 允许使用 <webview> 标签
      },
      ...restOptions,
    });

    win.loadFile(htmlPath).then(() => {
      win.webContents.openDevTools(); // 开启控制台
    });

    this.wins.push(win);

    return win;
  };
}

module.exports = {
  App,
};
