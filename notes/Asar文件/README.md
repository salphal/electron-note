## Atom Shell Archive

> ASAR 文件 是一种由 Electron 框架使用的归档文件格式 \
> 在 Electron 应用进行构建的时候, 会吧所有的源代码以及相关的资源为难都打包到这个文件里面

asar 文件开头有一段 json, 用于描述其内部文件
其中 files 中主要描述被打包进来的文件( 大小, 文件偏移量 )

```json


{
  "fies": {
    "default_app.js": {
      "size": 38848,
      "unpacked": true
    },
    "icon.png": {
      "size": 1024,
      "offset": "0"
    },
    "index.html": {
      "size": 52792,
      "unpacked": true
    },
    "index.css": {
      "size": 21,
      "offset": "1023",
      "executable": true
    },
    "pickle.js": {
      "size": 4626,
      "offset": 1044
    },
    "main.js": {
      "size": 593,
      "offset": 5670
    }
  }
}


```


性能优化:

asar 是一个归档文件, 意味着将原本项目中的所有文件合并成一个单文件
操作系统加载时候仅需要一个文件和偏移量即可获得所有文件

避免文件路径的限制:

windows 操作系统, 默认最长的资源路径为 256 位字符串
打包为 asar 归档文件后, 使用的是虚拟路径, 绕开了外部文件系统的限制


#### 安装

```shell


pnpm install @electron/asar


```

#### 打包

> 只能在项目的父级目录使用

```shell


cd .. && asar pack ./[project_name] [dist].asar

# eg
cd .. && asar pack MacOs打包 helloworld.asar


```
#### 使用

直接将打好的包, 分享给 拥有 electron 环境的项目直接使用

