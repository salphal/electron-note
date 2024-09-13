const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ htmlPath: './index1.html' });
  const win2 = app.createWindow({ htmlPath: './index2.html' });
});
