const { clipboard, ipcMain } = require('electron');

const writeClipboardChannel = 'writeClipboardChannel';

const readClipboardChannel = 'readClipboardChannel';

/**
 * https://www.electronjs.org/zh/docs/latest/api/clipboard
 */

class AppClipboard {
  initClipboardChannel() {
    this.initWriteClipboardChannel();
    this.initReadClipboardChannel();
  }

  initWriteClipboardChannel() {
    ipcMain.on(writeClipboardChannel, (event, content) => {
      if (typeof content === 'string') {
        this.writeClipboard(content);
      }
    });
  }

  initReadClipboardChannel() {
    ipcMain.on(readClipboardChannel, (event) => {
      const content = this.readClipboard();
      event.reply(readClipboardChannel, content);
    });
  }

  writeClipboard(content) {
    clipboard.writeText(content);
  }

  readClipboard() {
    return clipboard.readText();
  }
}

module.exports = {
  AppClipboard,
  writeClipboardChannel,
  readClipboardChannel,
};
