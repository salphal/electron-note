const { app, BrowserWindow, globalShortcut } = require('electron/main');
const { mixins } = require('./mixins');
const { AppTray } = require('./app-tray');
const { AppClipboard } = require('./app-clipboard');
const { AppNotification } = require('./app-notification');
const { AppDialog } = require('./app-dialog');
const { AppMenu } = require('./app-menu');
const { ElectronWindow } = require('./electron-window');
const { EventCenterChannel } = require('./channel/event-center-channel');
const { GlobalShortcutChannel } = require('./channel/global-shortcut-channel');
const { AppProgressbar } = require('./app-progressbar');
const { AppFile } = require('./app-file');
const { AppStore } = require('./app-store');

class App extends mixins(
  AppTray, // 托盘图标及菜单
  ElectronWindow, // 全局窗口管理
  EventCenterChannel, // 全局事件中心
  GlobalShortcutChannel, // 全局快捷键
  AppClipboard, // 全局剪切板
  AppNotification, // 全局通知
  AppDialog, // 全局对话框
  AppMenu, // 应用全局菜单
  AppProgressbar, // 应用进度条
  AppFile, // 数据文件控制
  AppStore, // 全局数据仓库
) {
  app = app;

  constructor(props = {}) {
    super();
    console.log('=>(app.js:29) userData', this.app.getAppPath('userData'));
    console.log('=>(app.js:29) home', this.app.getAppPath('home'));
    console.log('=>(app.js:29) desktop', this.app.getAppPath('desktop'));
    console.log('=>(app.js:29) document', this.app.getAppPath('document'));
    console.log('=>(app.js:29) downloads', this.app.getAppPath('downloads'));
    console.log('=>(app.js:29) music', this.app.getAppPath('music'));
  }

  /**
   * 初始化
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
        /**
         * app.ready
         * 应用注册后，才能去挂载方法或注册事件等
         */
        this.app.whenReady().then(() => {
          this.tray = this.initAppTray(this.winMap);
          this.initTrayMenu();

          this.initAppStore();

          this.initChannel();
          this.initAppNotification();

          this.initAppDialog();

          this.initGlobalShortcutChannel();
          this.initClipboardChannel();

          this.initWindowChannel();

          this.initAppMenu();
          this.initAppProgressBar();
          this.initAppFile(this.app);

          // 兼容 mac
          this.app.on('activate', () => {
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
      /**
       * 应用关闭前, 移除注册的全局快捷键
       */
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
