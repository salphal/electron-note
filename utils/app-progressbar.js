const { BrowserWindow, ipcMain, Notification } = require('electron');

/**
 * https://www.electronjs.org/zh/docs/latest/tutorial/progress-bar#%E6%A6%82%E8%A7%88
 */

const progressbarChannel = 'progressbarChannel';

class AppProgressbar {
  initAppProgressBar(app) {
    this.initProgressBarChannel();
  }

  initProgressBarChannel() {
    ipcMain.on(progressbarChannel, (event, rate) => {
      if (typeof rate === 'number') {
        // this.setProgressRate(1);
        // this.setProgressRate(rate);
      }
    });
  }

  /**
   * @param {number} rate - 进度
   *  -1        删除进度条
   *  {0,1}     显示进度 0 ～ 100%
   *  {1,}      win中显示为不确定的进度, 其他系统显示为 100%
   */
  setProgressRate(rate) {
    this.app.setProgressBar(rate);
  }
}

module.exports = {
  AppProgressbar,
  progressbarChannel,
};
