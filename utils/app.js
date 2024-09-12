const { app, BrowserWindow } = require('electron/main');
const { mixins } = require('./mixins');
const { ElectronWindow } = require('./electron-window');
const { EventCenterChannel } = require('./channel/event-center-channel');

class App extends mixins(ElectronWindow, EventCenterChannel) {
  app = app;

  constructor(props = {}) {
    super();
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
      this.initChannel();
      // 兼容 mac
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.initWindows();
          this.initChannel();
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
