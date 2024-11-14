let isInitialization = false;

function exception() {
  // 进行初始化操作
  isInitialization = true;
  if (process.type === 'renderer') {
    window.addEventListener('error', (e) => {
      e.preventDefault();
      console.log('这是来自于 渲染进程 的 error 错误', e.error);
    });
    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      console.log('这是来自于 渲染进程 的 unhandledrejection 错误', e.reason);
    });
  } else {
    process.on('uncaughtException', (error) => {
      console.log('这是来自于 主进程 的 uncaughtException 错误', error);
    });
    process.on('unhandledrejection', (error) => {
      console.log('这是来自于 主进程 的 unhandledrejection 错误', error);
    });
  }
}

module.exports = exception;
