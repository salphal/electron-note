const { ipcMain } = require('electron');
const { channel } = require('./constant');

ipcMain.on(channel, (event, message) => {
  try {
    // 主进程收到消息( 在启动的进程日志中 )
    console.log('=>(main-process.js:4) ipcMain.message', message);
    // 主进程回复渲染进程
    event.reply(channel, 'hi');
  } catch (err) {
    console.error(err);
  }
});
