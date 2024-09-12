const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron/main');

const registerChannel = 'registerChannel';
const emitChannel = 'emitChannel';

class EventCenterChannel {
  channelMap = {};

  initChannel() {
    this.initRegisterChannel();
    this.initEmitChannel();
  }

  initRegisterChannel() {
    ipcMain.on(registerChannel, (event, channel) => {
      try {
        const channelId = event.sender.id;
        this.on(channel, channelId);
      } catch (err) {
        console.error(err);
      }
    });
  }

  initEmitChannel() {
    ipcMain.on(emitChannel, (event, channel, ...args) => {
      try {
        channel && this.emit(channel, ...args);
      } catch (err) {
        console.error(err);
      }
    });
  }

  /**
   * 注册事件
   */
  on(channel, webContentsId) {
    if (!channel || !webContentsId) return;
    console.log('=>(channel.js:39) on', channel, webContentsId);
    if (Array.isArray(this.channelMap[channel])) {
      let isRegister = false;
      const currentChannel = this.channelMap[channel];
      for (let i = 0; i < currentChannel.length; i++) {
        if (currentChannel[i] === webContentsId) {
          isRegister = true;
          break;
        }
      }
      if (!isRegister) {
        this.channelMap[channel].push(webContentsId);
      }
    } else {
      this.channelMap[channel] = [webContentsId];
    }
    console.log('=> channelMap', this.channelMap);
    // console.log('=> wins', this.wins);
  }

  /**
   * 删除事件
   */
  off(channel, webContentsId) {
    console.log('=>(channel.js:60) off', channel, webContentsId);
    if (Array.isArray(this.channelMap[channel])) {
      const currentChannel = this.channelMap[channel];
      if (
        Array.isArray(currentChannel) &&
        currentChannel.length &&
        currentChannel.includes(webContentsId)
      ) {
        this.channelMap[channel] = this.channelMap[channel].filter((id) => id !== webContentsId);
      }
    }
    console.log('=> channelMap', this.channelMap);
    // console.log('=> wins', this.wins);
  }

  /**
   * 触发事件
   */
  emit(channel, ...args) {
    console.log('=>(channel.js:77) emit', channel, ...args);
    const webContentsIds = this._getWebContentsIdsByChannel(channel);
    for (let i = 0; i < webContentsIds.length; i++) {
      if (Array.isArray(this.wins) && this.wins.length) {
        for (let j = 0; j < this.wins.length; j++) {
          const win = this.wins[j];
          if (win instanceof BrowserWindow) {
            const winId = this._getWinId(win);
            if (winId === webContentsIds[i]) {
              win.webContents.send(channel, ...args);
            }
          }
        }
      }
    }
    console.log('=> channelMap', this.channelMap);
    // console.log('=> wins', this.wins);
  }

  _getWinId(win) {
    return win.webContents.id || null;
  }

  _getWebContentsIdsByChannel(channel) {
    return this.channelMap[channel] || [];
  }
}

module.exports = {
  EventCenterChannel,
  registerChannel,
  emitChannel,
};
