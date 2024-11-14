### 打包工具

#### Electron Packager

> https://github.com/electron/packager

适合小型或中型项目, 对打包过程的要求不是特别复杂 \
只需要减淡将应用打包成可执行文件, 不需要额外的安装程序或更新机制

- 简单, 灵活, 适合于快速将 Electron 应用打包成可执行文件
- 支持多平台打包, 包括 windows, macOs 和 linux
- 允许自定义打包选项, 如应用图表, 版本号, 应用名称等
- 不内置生成安装程序的功能, 但可以结合其他工具( NSIS, DMG )来创建安装包

#### Electron Builder

> https://github.com/electron-userland/electron-builder

适合于需要复杂打包和分发流程的中大型项目 \
需要专业的安装程序, 并实现自动更新功能时

- 提供一套全面的解决方案, 包括打包, 创建安装程序, 自动更新等
- 支持广泛的安装包格式, 如 NSIS, AppImage, DMG, Snap等
- 高度可配置, 可通过 electron-build.yml(json,toml)详细控制打包和分发过程
- 内置自动更新机制, 与Github, S3等服务紧密集成, 方便应用发布和更新

#### Electron Forge

> https://github.com/electron/forge

官方维护, 当 Electron 支持新的应用程序构建功能时, 该工具会立即集成 \
Electron Forge 专注于将现有的工具组合成一个单一的构建流程 \
易于跟踪代码的流程和扩展

- 综合性工具, 提供了开发打包的全流程支持
- 集成 webpack, Electron Package 和 Electron Builder 的部分功能, 提供了一站式的开发体验
- 通过插件系统扩展功能, 支持自定义 webpack 配置, React, vue 等前端框架
- 简化开发和打包的流程, 通过减淡的命令即可启动开发环境, 打包和创建安装程序

### macOs

[Icon Generator](https://icongenerator.net/)

macOs 打包应用时, 需要一套不同尺寸的图标

#### 多尺寸图标生成

1. 安装依赖

```shell


pnpm i electron-icon-builder -D


```

2. 配置 package.json 中的 scripts

```json


{
  "scripts": {
    "build-icon": "electron-icon-builder --input=./assets/logo.png --flatten"
  }
}


```

3. 在当前文件中生成多尺寸的图标文件夹 icons

#### 打包配置

> package.json > build

```json lines


{
  "scripts": {
    "build": "electron-builder"
  },
  "build": {
    // 应用唯一标识符( 通常采用反向域名的命名方式 )
    "appId": "com.organize.name",
    "mac": {
      // 表示当前应用在 appStore 中所属的类别
      "category": "public.app-category.utilities",
      // 打包的类型
      "target": [
        "dmg",
        "pkg"
      ],
      // 开发者ID
      "identity": "Developer ID Application [开发者名]"
    },
    "dmg": {
      // 应用名称
      "title": "Application Name",
      // 多尺寸 icon 文件夹
      "icon": "./icons",
      // 安装时的弹窗背景图
      "background": "./assets/background.jpeg",
      // 安装时的弹窗窗口大小
      "window": {
        "width": 600,
        "height": 400
      },
      "contents": [
        // 安装图标的位置
        {
          "x": 180,
          "y": 170
        },
        // 安装到的文件软链接
        {
          "x": 480,
          "y": 170,
          "type": "link",
          "path": "/Applications"
        },
      ]
    },
    "pkg": {
      "installLocation": "/Applications"
    }
  },
}


```

#### 苹果开发者

> 用于上架 appStore

```


添加代码签名认证


```











