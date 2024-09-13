const { app, BrowserWindow } = require('electron/main');
const { mixins } = require('./mixins');
const { ElectronWindow } = require('./electron-window');
const { EventCenterChannel } = require('./channel/event-center-channel');

class App extends mixins(ElectronWindow, EventCenterChannel) {
  app = app;

  constructor(props = {}) {
    super();
  }

  /**
   * @return {Promise<App>}
   */
  init() {
    return new Promise((resolve, reject) => {
      this._ready().then((res) => resolve(res));
      this._closed();
    });
  }

  /**
   * 当主进程准备就绪
   * @return {Promise<App>}
   */
  _ready() {
    return new Promise((resolve, reject) => {
      try {
        this.app.whenReady().then(() => {
          this.initChannel();
          // 兼容 mac
          app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
              this.initChannel();
            }
          });
          resolve(this);
        });
      } catch (err) {
        reject(err);
      }
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
