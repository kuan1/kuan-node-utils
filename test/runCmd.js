const { runCmd } = require('../src')

runCmd('ls', ['-a']).then(res => {
  console.log(res)
})