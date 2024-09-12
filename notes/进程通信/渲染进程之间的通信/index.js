const { App } = require('../../../utils/app');

const app = new App();

const win2 = app.addWindow({ htmlPath: './index2.html' });
const win1 = app.addWindow({ htmlPath: './index1.html' });
