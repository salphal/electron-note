const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const parent = app.createWindow({ name: 'parent', htmlPath: './index1.html' });
  const child = app.createWindow({
    name: 'child',
    htmlPath: './index2.html',
    width: 400,
    height: 200,
    parent,
  });
});
