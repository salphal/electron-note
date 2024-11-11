const { Notification, ipcMain } = require('electron');

/**
 * https://www.electronjs.org/zh/docs/latest/tutorial/notifications
 */

const notificationChannel = 'notificationChannel';

class AppNotification {
  initAppNotification() {
    this.initNotificationChannel();
  }

  initNotificationChannel() {
    ipcMain.on(notificationChannel, (event, config) => {
      this.notification(config);
    });
  }

  notification({ title, body }) {
    const isAllowed = Notification.isSupported();
    /**
     * 注意电脑是否是勿扰模式
     * 注意电脑是否是勿扰模式
     * 注意电脑是否是勿扰模式
     */
    if (isAllowed) {
      console.log('=>(app-notification.js:23) 是否支持 Notification:', isAllowed);
      const notification = new Notification({ title, body });
      notification.on('click', () => {
        console.log('=>(app-notification.js:28) notification click');
      });
      notification.on('show', () => {
        console.log('=>(app-notification.js:28) notification show');
      });
      notification.on('close', () => {
        console.log('=>(app-notification.js:28) notification close');
      });
      notification.show();
    }
  }
}

module.exports = {
  AppNotification,
  notificationChannel,
};
