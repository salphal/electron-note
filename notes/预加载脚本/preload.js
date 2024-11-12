const fs = require('fs');

/**
 * 预先加载脚本
 *
 *  - 可以使用 nodejs API
 *  - 可以使用 渲染进程 API
 *  - 可以使用 ipc 和主进程之间 通信
 */

window.myApi = {
  write: fs.writeSync,
};

console.log('preload.js 执行');
