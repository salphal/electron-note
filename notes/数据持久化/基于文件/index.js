const { App } = require('../../../utils/app');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ name: 'win1', htmlPath: './index1.html' });
});
