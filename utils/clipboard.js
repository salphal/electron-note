const { clipboard, ipcMain } = require('electron');

const writeClipboardChannel = 'writeClipboardChannel';

const readClipboardChannel = 'readClipboardChannel';

/**
 * https://www.electronjs.org/zh/docs/latest/api/clipboard
 */

class Clipboard {
  initClipboardChannel() {
    this.initWriteClipboardChannel();
  }

  initWriteClipboardChannel() {
    ipcMain.on(writeClipboardChannel, (event, content) => {
      if (typeof content === 'string') {
        this.writeClipboard(content);
      }
    });
  }

  initReadClipboardChannel() {
    ipcMain.on(readClipboardChannel, (event) => {});
  }

  writeClipboard(content) {
    clipboard.write(content);
  }

  readClipboard() {
    return clipboard.readText();
  }
}

module.exports = {
  Clipboard,
};
