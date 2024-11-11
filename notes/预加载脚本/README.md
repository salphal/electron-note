## 渲染进程之间通信

> Electron@12 版本后, 默认开启 上下文隔离 \
> 意味着默认情况下, 渲染进程里面浏览器不再共享 window 对象 \
> 所以默认情况下, 在 preload 中对 window 的任何修改, 都不会影响渲染进程里面的 window 对象 \
> https://www.electronjs.org/zh/docs/latest/tutorial/examples

```



```
