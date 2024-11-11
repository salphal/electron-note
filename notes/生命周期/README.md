## 生命周期

#### app hooks

> https://www.electronjs.org/zh/docs/latest/api/app

```text


will-finish-launching       // 在应用网蹭你基本启动进程之后触发

ready                       // 当 Electron 完成初始化后触发

window-all-closed           // 所有窗口都关闭的时候触发

... ...

before-quit                 // 退出应用之前触发

will-quit                   // 即将退出应用的时候

quit                        // 退出应用的时候



```


#### BrowserWindow

> https://www.electronjs.org/zh/docs/latest/api/browser-window

```text


show                // 当窗口展示的时候

close               // 当窗口关闭的时候

focus               // 当窗口聚焦的时候

closed              // 当窗口被关闭的时候

maxminze            // 当窗口最大化的时候

minminze            // 当窗口最小化的时候


```













