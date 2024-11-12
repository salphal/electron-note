const { App } = require('../../utils/app');
const path = require('path');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({
    name: 'win1',
    htmlPath: './index1.html',
    preload: path.join(__dirname, 'preload.js'), // 预加载脚本
  });
});
