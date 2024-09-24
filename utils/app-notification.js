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
    ipcMain.on(notificationChannel, (event, notification) => {
      this.notification(notification);
    });
  }

  notification({ title, body }) {
    new Notification({ title, body }).show();
  }
}

module.exports = {
  AppNotification,
  notificationChannel,
};
