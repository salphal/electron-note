const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win2 = app.createWindow('win2', { htmlPath: './index2.html' });
  const win3 = app.createWindow('win3', { htmlPath: './index2.html' });
  const win1 = app.createWindow('win1', { htmlPath: './index1.html' });
});
