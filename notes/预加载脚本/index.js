const { App } = require('../../utils/app');
const path = require('path');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({
    name: 'win1',
    htmlPath: './index1.html',
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程( 在窗口 )里面使用 node.js
      contextIsolation: true, // 开启上下文隔离, 则会关闭 渲染进程 nodejs 的能力
      preload: path.join(__dirname, 'preload.js'), // 预加载脚本
    },
  });
});
