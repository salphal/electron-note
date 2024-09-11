const { ipcRenderer } = require('electron');
const { mainChannel, rendererChannel } = require('./constant');

console.log('=>(main.js:4) window', window);

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  ipcRenderer.send(mainChannel, 'hello');
});

ipcRenderer.on(rendererChannel, (event, message) => {
  console.log(`=>(main.js:20) ${rendererChannel}`, message);
});
