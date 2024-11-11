const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const fileNameList = [
  'home', // 户的 home 文件夹( 主目录 )
  'appData', // 每个用户的应用程序数据目
  'userData', // 储存你应用程序配置文件的文件夹
  'sessionData', // 目录存储由 Session 生成的数据
  'temp', // 临时文件夹
  'exe', // 当前的可执行文件
  'module', // libchromiumcontent 库
  'desktop', // 当前用户的桌面文件夹
  'documents', // 用户文档目录的路径
  'music', // 用户音乐目录的路径
  'pictures', // 用户图片目录的路径
  'videos', // 用户视频目录的路径
  'recent', // 用户最近文件的目录( 仅限 Windows )
  'logs', // 应用程序的日志文件夹
  'crashDumps', // 崩溃转储文件存储的目录
];

const appFileChannel = 'appFileChannel';

class AppFile {
  initAppFile() {
    this.initAppFileChannel();
  }

  initAppFileChannel() {
    ipcMain.on(appFileChannel, (event, config) => {
      this.save(config);
    });
  }

  save(config) {
    const baseConfig = {
      pathName: '',
      filename: '',
      content: '',
    };
    config = { ...baseConfig, ...config };

    let pathName = '';

    if (typeof config.pathName === 'string' && fileNameList.includes(config.pathName)) {
      pathName = this.app.getPath('desktop');
    } else {
      if (typeof config.filePath === 'string') {
        pathName = config.filePath;
      }
    }

    console.log('=>(app-file.js:44) config', config);

    if (pathName && config.filename) {
      const fullFilePath = path.join(pathName, config.filename);
      console.log('=>(app-file.js:60) fullFilePath', fullFilePath);
      // fs.writeSync(fullFilePath, 'w');
      // 打开文件，获取文件描述符
      const fd = fs.openSync(fullFilePath, 'w'); // 'w' 表示写模式
      // 使用文件描述符将字符串写入文件
      fs.writeSync(fd, config.content, 0, 'utf8');
    }
  }
}

module.exports = {
  AppFile,
  appFileChannel,
};
