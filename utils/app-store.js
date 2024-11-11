const { ipcMain } = require('electron');
const Store = require('electron-store');


/**
 * electron 内置 json 存储配置的数据仓库
 * https://www.npmjs.com/package/electron-store
 *
 * 默认存储在 userData 目录下
 */
const store = new Store({
  // name: 'electron-global-store', // 自定义文件名称( 默认: config )
  // encryptionKey: 'aes-256-cbc', // 加密方式
  // cwd: '/some/path', // 自定义存储文件的路径
  // fileExtension: 'json', // 文件扩展名( 默认: json )
});

const appStoreChannel = 'appStoreChannel';

class AppStore {
  initAppStore() {
    this.initAppStoreChannel();
  }

  initAppStoreChannel() {
    ipcMain.on(appStoreChannel, (event, config) => {});
  }

  /**
   * 设置属性和值
   * @param {string} key - 属性名
   * @param {*} value - 属性值
   *
   * store.set(key, val);
   * store.set("foo.bar", val);
   */
  setAppStore(key, value) {
    store.set(key, value);
  }

  /**
   * 根据属性名获取值
   * @param {string} key - 属性名
   *
   * store.get(key);
   * store.get("foo.bar");
   */
  getAppStore(key) {
    return store.get(key);
  }
}


module.exports = {
  AppStore,
  appStoreChannel
}
