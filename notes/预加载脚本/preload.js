const fs = require('fs');
const { contextBridge } = require('electron');

/**
 * 预先加载脚本
 *
 *  - 可以使用 nodejs API
 *  - 可以使用 渲染进程 API
 *  - 可以使用 ipc 和主进程之间 通信
 */

// window.myApi = {
//   write: fs.writeSync,
// };

/**
 * 上下文隔离    // electron@12 后默认开启
 *
 * 主要用于隔离 渲染进程 和 主进程
 *
 * 通过 contextBridge 暴露方法给 渲染进程的 window
 */
// 通常使用这个
contextBridge.exposeInMainWorld('myApi', {
  write: fs.writeSync,
});

/**
 * exposeInMainWorld: 适用于希望直接给 renderer 进程提供受控的 API，使得网页内容可以安全访问
 * exposeInIsolatedWorld( 更安全 ): 适用于希望在上下文隔离环境中为内容脚本提供功能，不直接向网页内容暴露的 API 场景
 */
contextBridge.exposeInIsolatedWorld('worldId', 'myApi', {});

console.log('preload.js 执行');
