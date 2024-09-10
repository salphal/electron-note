const {ipcRenderer} = require('electron');
const {channel} = require('./constant');

ipcRenderer.on(channel, (event, message) => {
  // 主进程 回复 渲染进程( 在浏览器的 console 中 )
  console.log('=>(renderer-process.js:4) ipcRenderer.message', message);
});
