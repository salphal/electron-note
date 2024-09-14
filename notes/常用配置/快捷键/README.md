## 快捷键

#### 渲染进程中的快捷键

> 浏览器中

```js


window.onkeydown = function (e) {

  if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
    // ctrl + q
  }
};


```

#### 全局快捷键

> 操作系统 \
> https://www.electronjs.org/zh/docs/latest/tutorial/keyboard-shortcuts

```js

const { globalShortcut } = require('electron/main')

/**
 * 只能正在 app.ready 后才能注册
 * 
 * @return {Boolean} - 是否注册成功
 */
const res = globalShortcut.register('Alt+CommandOrControl+I', () => {
  console.log('Electron loves global shortcuts!')
});

console.log(globalShortcut.isRegistered("ctrl+e")); // 判断全局快捷键是否注册成功


/**
 * 应用退出时, 需要移除注册的快捷键
 */
globalShortcut.unregister('ctrl+e');
globalShortcut.unregisterAll()


```

