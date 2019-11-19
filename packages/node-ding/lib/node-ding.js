const axios = require("axios");
const createSign = require("./createSign");

const FIVE_MINUTE = 1000 * 60 * 50;
const BASE = "https://oapi.dingtalk.com/robot/send";

module.exports = class Ding {
  constructor({ access_token, secret = "" }) {
    if (!secret) throw new Error("Missing arguments 'secret'");
    if (!access_token) throw new Error("Missing arguments 'access_token'");
    this.secret = secret.trim();
    this.params = {
      timestamp: 0,
      access_token,
      sign: ""
    };
  }

  // 自定义发送
  async send(data) {
    const timestamp = Date.now();
    const { params = {}, secret } = this;
    if (secret && timestamp - params.timestamp > FIVE_MINUTE) {
      params.timestamp = timestamp;
      params.sign = createSign(secret, timestamp);
    }
    const { data: res } = await axios({
      url: `${BASE}?access_token=${params.access_token}&timestamp=${params.timestamp}&sign=${params.sign}`,
      method: "post",
      data
    });
    return res;
  }

  // 发送markdown
  sendMd(title = "标题", text = "内容", isAtAll = true) {
    const finalData = {
      msgtype: "markdown",
      markdown: {
        title,
        text
      },
      at: {
        isAtAll
      }
    };
    return this.send(finalData);
  }

  // 发送卡片类型
  sendCard(title, text, url, singleTitle = "") {
    const data = {
      actionCard: {
        title,
        text,
        hideAvatar: "0",
        btnOrientation: "0",
        singleTitle,
        singleURL: url
      },
      msgtype: "actionCard"
    };
    return this.send(data);
  }
};
