# electron-note

#### remote

> 早期 electron 为了降低 主进程 和 渲染进程之间的通信难度提供的 API

```text


- 性能问题

通过 remote 模块可以使用原本只能在主进程里面使用的 API, 但这些操作都是跨进程的
在操作系统中一旦涉及到跨进程的操作, 性能上损耗可能会比较大


- 影子对象

在渲染进程中通过 remote 模块使用到了主进程里面的某个对象
看上去得到了主进程里面真正的对象, 实际上不是, 得到的是一个对象的代理( 影子 )


- 存在安全性问题

使用 remote 模块后, 渲染进程可以轻松的直接访问主进程的模块和对象
这会代理一些安全性问题, 可能会导致一些渲染进程里面的恶性代码利用该特性进行攻击


这个模块( remote )在 electron 10 版本后, 只能手动开启


```

主进程

```js


const { app, BrowserWindow } = require('electron');

const createWindow = () => {

  const win = BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,   // 允许使用 remote 模块
    },
  });

  win.loadFile('window/index.html');
};


app.whenReady()
  .then(() => {
    createWindow();
  });


```

渲染进程

```js

const { remote } = require('electron');

let newWin = null;

btn.onclick = () => {

  newWin = new remote.BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  newWin.loadFile('./index2.html');
};


```

#### 预加载脚本

> 

```js





```





