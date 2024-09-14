const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win2 = app.createWindow({ name: 'win2', htmlPath: './index2.html' });
  const win3 = app.createWindow({ name: 'win3', htmlPath: './index3.html' });
  const win1 = app.createWindow({ name: 'win1', htmlPath: './index1.html' });
});
