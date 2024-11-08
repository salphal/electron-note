const { Menu } = require('electron');

/**
 * 1. 定义菜单配置
 * 2. 创建菜单配置
 * 3. 设置菜单配置
 * https://www.electronjs.org/zh/docs/latest/api/menu#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95
 */

/**
 * 是否是 macOs 系统
 */
const isMac = process.platform === 'darwin';

class AppMenu {
  /**
   * 菜单项类型
   * @typedef {Object} MenuItem
   * @property {string} label - 菜单标签
   * @property {MenuItem[]} [subMenu] - 子菜单列表，可以包含 MenuItem 类型的嵌套
   * @property {'about'|'services'|'hide'|'hideOthers'|'unhide'|'quit'} [role] - 预定义菜单项的角色( 默认预设菜单类型 )
   * @property {'separator'|'checkbox'|'radio'|'normal'} [type] - 菜单项的类型( 自定义菜单 )
   * @property {Function} [click] - 点击事件的回调函数
   */
  /**
   * 初始化应用菜单
   * @type {MenuItem[]}
   */
  initAppMenu() {
    const menuList = [
      // { role: 'appMenu' }
      ...(isMac
        ? [
            {
              label: "测试",
              submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
              ],
            },
          ]
        : []),
      // { role: 'fileMenu' }
      {
        label: 'File',
        submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
      },
      // { role: 'editMenu' }
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac
            ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                  label: 'Speech',
                  submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
                },
              ]
            : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
        ],
      },
      // { role: 'viewMenu' }
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      // { role: 'windowMenu' }
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          ...(isMac
            ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
            : [{ role: 'close' }]),
        ],
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron');
              await shell.openExternal('https://electronjs.org');
            },
          },
        ],
      },
    ];
    const menu = Menu.buildFromTemplate(menuList);
    Menu.setApplicationMenu(menu);
  }
}

module.exports = {
  AppMenu,
};
