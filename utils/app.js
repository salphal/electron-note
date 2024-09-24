const { app, BrowserWindow, globalShortcut } = require('electron/main');
const { mixins } = require('./mixins');
const { AppTray } = require('./app-tray');
const { AppClipboard } = require('./app-clipboard');
const { AppNotification } = require('./app-notification');
const { ElectronWindow } = require('./electron-window');
const { EventCenterChannel } = require('./channel/event-center-channel');
const { GlobalShortcutChannel } = require('./channel/global-shortcut-channel');

class App extends mixins(
  AppTray,
  ElectronWindow,
  EventCenterChannel,
  GlobalShortcutChannel,
  AppClipboard,
  AppNotification,
) {
  app = app;
  tray;

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

          this.initGlobalShortcutChannel();
          this.initClipboardChannel();
          this.initAppNotification();

          this.tray = this.initAppTray(this.winMap);
          this.initTrayMenu();

          this.initWindowChannel();

          // 兼容 mac
          app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
              this.initChannel();
              this.initWindowChannel();
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
      this.unregisterAllShortcut();
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }
}

module.exports = {
  App,
};
