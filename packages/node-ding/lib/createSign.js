const crypto = require("crypto");

module.exports = (secret, timestamp) => {
  const str = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}\n${secret}`)
    .digest()
    .toString("base64");
  return encodeURIComponent(str);
};
