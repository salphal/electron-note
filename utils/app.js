const { app, BrowserWindow } = require('electron/main');
const { mixins } = require('./mixins');
const { ElectronWindow } = require('./electron-window');

class App extends mixins(ElectronWindow) {
  app = app;

  constructor(props = {}) {
    super(props);
    this.init();
  }

  init() {
    this._ready();
    this._closed();
  }

  /**
   * 当主进程准备就绪
   */
  _ready() {
    this.app.whenReady().then(() => {
      this.initWindows();
      // 兼容 mac
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.initWindows();
        }
      });
    });
  }

  /**
   * 当所有窗口关闭, 则主进程关闭
   */
  _closed() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }
}

module.exports = {
  App,
};
