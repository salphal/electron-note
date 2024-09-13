const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const parent = app.createWindow({ htmlPath: './index1.html' });
  const child = app.createWindow({ htmlPath: './index2.html', width: 400, height: 200, parent });
});
