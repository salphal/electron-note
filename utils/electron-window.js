const { BrowserWindow, ipcMain } = require('electron');

const showWindowChannel = 'openWindowChannel';
const hideWindowChannel = 'closeWindowChannel';

class ElectronWindow {
  wins = [];
  winMap = new Map();

  initWindowChannel() {
    this._initShowWindowChannel();
    this._initHideWindowChannel();
  }

  _initShowWindowChannel() {
    ipcMain.on(showWindowChannel, (event, name) => {
      console.log('=>(electron-window.js:19) showWindowChannel', name);
      this.showWindow(name);
    });
  }

  _initHideWindowChannel() {
    ipcMain.on(hideWindowChannel, (event, name) => {
      this.hideWindow(name);
    });
  }

  /**
   * 创建窗口
   * @param name {string} - 窗口唯一名称( 不能重复 )
   * @param options {{
   *  [key: string]: any;
   *  htmlPath: string;
   *  debugger: boolean
   *  }} - index.html 的路径
   */
  createWindow = (options) => {
    const { name, htmlPath, ...restOptions } = options;

    const win = new BrowserWindow({
      width: 1000,
      height: 500,

      // maxWidth: 1000, // 窗口最大宽度
      // minWidth: 1000, // 窗口最小宽度
      // maxHeight: 500, // 窗口最大高度
      // minHeight: 500, // 窗口最小高度

      // resizable: true, // 窗口是否可改变大小
      // movable: true, // 窗口是否可移动

      // x: 1000, // 窗口距离左边的距离
      // y: 1000, // 窗口距离上边的距离

      // icon: path.join(__dirname, 'log.ico'),

      // frame: true, // 控制 标题栏, 菜单栏, 边框 是否展示

      /**
       * 标题优先级
       *
       * 1. HTML.title
       * 2. BrowserWindow.title
       * 3. package.json.name
       * 4. Electron 默认值: Electron
       *
       */

      /**
       * 父子联动: 设置该窗口的父窗口实例
       *
       * parent: browserWindow;
       */
      parent: null,

      /**
       * 窗口置顶
       */
      alwaysOnTop: false,

      /**
       * 窗口是否透明
       */
      transparent: false,

      webPreferences: {
        nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
        contextIsolation: false, // 关闭上下文隔离
        webviewTag: true, // 允许使用 <webview> 标签
      },
      ...restOptions,
    });

    if (!options.debugger) {
      win.loadFile(htmlPath).then(() => {
        win.webContents.openDevTools(); // 开启控制台
      });
    }

    this.wins.push(win);

    this.winMap.set(name, win);

    return win;
  };

  showWindow(name) {
    const win = this.winMap.get(name);
    if (win instanceof BrowserWindow) win.show();
  }

  hideWindow(name) {
    const win = this.winMap.get(name);
    if (win instanceof BrowserWindow) win.hide();
  }
}

module.exports = {
  ElectronWindow,
  showWindowChannel,
  hideWindowChannel,
};
