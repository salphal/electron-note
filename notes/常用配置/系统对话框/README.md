## 系统通知

```js


const {Notification} = require('electron');

const options = {
  title: "标题",
  body: "内容"
};

const notification = new Notification(options.title, options)

notification.onclick = () => {
};


```
