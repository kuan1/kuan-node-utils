const utils = require('../src')

;(async () => {
  const data = await utils.feedback.select()
  console.log(11, data)
})()
