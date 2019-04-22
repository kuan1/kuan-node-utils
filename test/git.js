const { git } = require('../src')
;(async () => {
  const res = await git.clone('https://github.com/kuan1/temp.git')
  console.log(res)
})()
