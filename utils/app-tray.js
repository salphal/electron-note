const { Tray, Menu } = require('electron');
const path = require('node:path');

class AppTray {
  initAppTray(winMap) {
    const iconPath = path.join(__dirname, 'tray.jpg');
    const tray = new Tray(iconPath);
    tray.on('click', () => {
      if (winMap instanceof Map) {
        const wins = Array.from(winMap.values());
        const isShow = wins.every((v) => v.isVisible());
        if (isShow) {
          wins.forEach((w) => w.hide());
        } else {
          wins.forEach((w) => w.show());
        }
      }
    });
    return tray;
  }

  initTrayMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '显示/隐藏',
        click: () => {
          this.hasWindowShow() ? this.hideAllWindows() : this.showAllWindows();
        },
      },
      {
        label: '退出',
        click: () => {
          this.app.quit();
        },
      },
    ]);
    this.tray.setContextMenu(contextMenu);
  }
}

module.exports = {
  AppTray,
};
