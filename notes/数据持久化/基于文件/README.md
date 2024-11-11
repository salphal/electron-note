## 基于文件的本地存储

### 获取/设置 各类型文件目录

#### 获取目录

> 在 electron 中可通过 app.getPath(target: string) 来获取默认的用户数据目录 \
> https://www.electronjs.org/zh/docs/latest/api/app#appgetapppath

```js


app.getPath('home');


```


home                // 用户的主目录

appData             // 当前用户的应用程序目录( 用户数据默认存储在这里 )

userData            // 对应用户个性化数据的目录

temp                // 临时目录

exe                 // 当前的可执行文件目录

desktop             // 用户的桌面文件

documents           // 用户的文档目录

downloads           // 用户的下载目录

music               // 用户的音乐目录

pictures            // 用户的图片目录

videos              // 用户的视频目录


#### 当前应用的路径

```js


app.getAppPath('home');


```

#### 设置目录

> 更新默认数据目录为自定义目录

```text


eg: app.setPath(pathName: string, newPath: string);


```

### 各操作系统文件配置

#### windows

```text


用户数据目录: 在 windows 操作系统中, 应用程序通常在以下路径存储用户数据

    - C:\Users\[username]\AppData\Reaming\          用于存储漫游数据, 即用户在不同的计算机上使用相同账户可以访问的数据
    
    - C:\Users\[username]\AppData\Local\            用于存储特定于单个计算机的数据

程序数据目录: 对于所有用户共享的应用数据, 通常存储在 C:\ProgramData\ 目录


```

#### macOs

```text


用户数据目录: 在 macOs 中, 应用程序的用户数据通常存储在用户的库目录( Library ) 中

    - /User/[username]/Library/                     这个目录用于存储应用程序的配置文件, 缓存和其他用户特定的数据
    
程序数据目录: 许多应用程序将数据存储在 /Users/[username]/Application Support/ 目录


```

#### linux

```text


用户数据目录: 在 Linux 系统中, 用于个性化数据通常存储在用户的主目录下的隐藏文件中( 这些文件通常以 . 开头 )
            
    - /home/[username]/.[application_name]          用于存储应用程序的个性化设置和数据
            

配置文件: 一些通用的配置文件可能存储在 

    - /home/[username]/.config 


```

