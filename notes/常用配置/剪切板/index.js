const { App } = require('../../../utils/app');
const { registerShortcutChannel } = require('../../../utils/channel/global-shortcut-channel');
const { Notification } = require('electron');

const app = new App();

app.init().then(() => {
  const win1 = app.createWindow({ name: 'win1', htmlPath: './index1.html' });
});
