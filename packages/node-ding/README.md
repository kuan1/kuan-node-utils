# @luzhongk/node-ding

> 发送钉钉消息

## Install

```bash
npm install @luzhongk/node-ding
```

## Usage

```js
const Ding = require("@luzhongk/node-ding");

const ding = new Ding({ access_token, secret });

// 发送markdown
const res1 = await ding.sendMd(
  "接收到markdown",
  `### 测试一下  
[这是一个链接](https://www.luzhongkuan.cn)`
);
console.log("markdown发送成功", res1);

// 发送卡片
const res2 = await ding.sendCard(
  "这是标题",
  `![这给一个图片](http://pic.kuan1.top/a56410b522f383cc53da5783305faa6b.png)`,
  "https://www.luzhongkuan.cn"
);
console.log("发送卡片成功", res2);
```
