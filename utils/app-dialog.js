const { dialog, ipcMain } = require('electron');

/**
 * 显示用于 打开 和 保存文件,警报 等的 本机系统对话框
 * https://www.electronjs.org/zh/docs/latest/api/dialog#%E6%96%B9%E6%B3%95
 */

const dialogChannel = 'dialogChannel';

class AppDialog {
  initAppDialog() {
    this.initDialog();
  }

  initDialog() {
    ipcMain.on(dialogChannel, (event, dialog) => {
      this.dialog(dialog);
    });
  }

  dialog({ title }) {
    /**
     * https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogwindow-options
     * @param {string} [title=""] - 标题
     * @param {string} [defaultPath=""] - 标题
     * @param {string} [buttonLabel="确认"] - 按钮的自定义标签
     * @param {Array<string>} [properties={}] - 包含对话框相关属性
     */
    dialog.showOpenDialog({});
  }
}

module.exports = {
  AppDialog,
  dialogChannel,
};
