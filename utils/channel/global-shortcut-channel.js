const { ipcMain, globalShortcut } = require('electron');

const registerShortcutChannel = 'registerShortcutChannel';
const unregisterShortcutChannel = 'unregisterShortcutChannel';

class GlobalShortcutChannel {
  globalShortcutMap = new Map();

  initGlobalShortcutChannel() {
    this._initRegisterShortcutChannel();
    this._initUnRegisterShortcutChannel();
    this.initRegisterAllShortcut();
  }

  _initRegisterShortcutChannel() {
    ipcMain.on(registerShortcutChannel, (event, name, callback) => {
      this.registerShortcut(name, callback);
    });
  }

  _initUnRegisterShortcutChannel() {
    ipcMain.on(unregisterShortcutChannel, (event, name) => {
      this.unregisterShortcut(name);
    });
  }

  initRegisterAllShortcut() {
    for (const [name, callback] of this.globalShortcutMap.entries()) {
      this.registerShortcut(name, callback);
    }
  }

  /**
   * @param shortcut {string} - 快捷键
   * @param callback {Function} - 回调事件
   */
  addGlobalShortcut(shortcut, callback) {
    this.globalShortcutMap.set(shortcut, callback);
  }

  /**
   * @param shortcut {string} - 快捷键
   * @param callback {Function} - 回调事件
   * @return {boolean}
   */
  registerShortcut(shortcut, callback) {
    if (typeof shortcut === 'string' && typeof callback === 'function') {
      return globalShortcut.register(shortcut, callback);
    }
    return false;
  }

  /**
   * @param shortcut {string} - 快捷键
   * @return {boolean}
   */
  unregisterShortcut(shortcut) {}

  unregisterAllShortcut() {
    globalShortcut.unregisterAll();
  }

  /**
   * @param shortcut {string} - 快捷键
   * @return {boolean}
   */
  isRegisterShortcut(shortcut) {
    return globalShortcut.isRegistered(shortcut);
  }
}

module.exports = {
  GlobalShortcutChannel,
  registerShortcutChannel,
  unregisterShortcutChannel,
};
