const { ipcRenderer } = require('electron');
const { App } = require('../../../utils/app');
const { registerChannel } = require('../../../utils/channel');
const { formWindow1Action, formWindow2Action } = require('./constant');

const app = new App();

const win2 = app.addWindow({ htmlPath: './index2.html' });
const win1 = app.addWindow({ htmlPath: './index1.html' });
