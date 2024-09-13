const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const parent = app.createWindow({ htmlPath: './index1.html' });
  const child = app.createWindow({
    htmlPath: './index2.html',
    width: 400,
    height: 200,
    alwaysOnTop: true,
  });
});

/**
 * @param flag {boolean} - 用于设置窗口是否始终至于顶部
 * @param level {?string} - 指定窗口相对于其他窗口的层次
 * @param relativeLevel {?number} - 设置在同样 level 时, 窗口的层次顺序
 */
// window.setAlwaysOnTop(true);
