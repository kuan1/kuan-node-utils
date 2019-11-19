const { input } = require("@luzhongk/node-feedback");
const Ding = require("../lib/node-ding");

// 发送markdown
async function sendMd(ding) {
  const res = await ding.sendMd(
    "接收到markdown",
    `### 测试一下  
[这是一个链接](https://www.luzhongkuan.cn)`
  );
  console.log("markdown发送成功", res);
}

// 发送卡片
async function sendCard(ding) {
  const res = await ding.sendCard(
    "这是标题",
    `![这给一个图片](http://pic.kuan1.top/a56410b522f383cc53da5783305faa6b.png)`,
    "https://www.luzhongkuan.cn",
    "这个是底部"
  );
  console.log("发送卡片成功", res);
}

async function test() {
  const access_token = await input("请输入access_token");
  const secret = await input("请输入secret");

  const ding = new Ding({ access_token, secret });

  await sendMd(ding);
  await sendCard(ding);
}

test();
