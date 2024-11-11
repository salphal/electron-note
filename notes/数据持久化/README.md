## Data persistence

### localFile

> 

```js





```

### electronStore

> 

```js





```

### indexdb

> https://github.com/dexie/Dexie.js

```js

let db = new Dexie('demo');

// 创建表的时候必须有 id, 其他字段可以在写入数据的时候临时决定
db.version(1)
  .stores({
    users: 'id',
  });

// 增加数据
await db.users.add({ id: 0, name: 'alphal' });

// 查询数据
await db.users.filter(users => users.name === 'alphal');

// 修改数据
await db.users.put({ id: 0, name: 'beta' });

// 删除数据
await db.users.delete(0);

// 数据排序
await db.users.orderBy('id');


```

### localStorage

> 默认多窗口共享同一个 localStorage

```js


/**
 * partition: 用于定义该窗口数据存储的独立性和持久性
 *  - persist: 这是一个前缀, 表示这是一个持久性的回话
 *  - myCustomPartition: 表示会话的唯一名称              // 每个独立的会话名称必须唯一
 */
const wind = new BrowserWindow({
    widht: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        partition: "persist:myCustomPartition",     // 配置这个后, 当前窗口的 localStorage 独立存在
    }
});


```

### sessionStorage

```js





```

