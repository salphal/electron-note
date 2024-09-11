const { BrowserWindow } = require('electron/main');

class ElectronWindow {
  windowConfigList = [];
  wins = [];

  /**
   * 初始化所有窗口
   */
  initWindows() {
    this.windowConfigList.forEach((options) => {
      this._createWindow(options);
    });
  }

  /**
   * 创建窗口
   * @param options {{[key: string]: any, htmlPath: string}} - index.html 的路径
   */
  addWindow(options) {
    const i = this.wins.length;
    this.windowConfigList.push(options);
    return this.wins[i];
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
  ElectronWindow,
};
