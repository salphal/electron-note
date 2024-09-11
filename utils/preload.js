const { contextBridge } = require('electron');

/**
 * 定义 全局对象
 * 在预加载时暴露一些变量或防范
 */
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// /**
//  * 所有的 Node.js API接口 都可以在 preload 进程中被调用
//  * 它拥有与Chrome扩展一样的沙盒
//  */
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };
//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency]);
//   }
// });
