const { BrowserWindow } = require('electron/main');

class ElectronWindow {
  wins = [];

  /**
   * 创建窗口
   * @param options {{
   *  [key: string]: any;
   *  htmlPath: string;
   *  debugger: boolean
   *  }} - index.html 的路径
   */
  createWindow = (options) => {
    const { htmlPath, ...restOptions } = options;

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

      /**
       * 窗口置顶
       *
       * alwaysOnTop: boolean;
       */

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

    return win;
  };
}

module.exports = {
  ElectronWindow,
};
