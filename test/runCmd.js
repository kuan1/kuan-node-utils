// const { runCmd } = require('../src')

// runCmd('ls', ['-a']).then(res => {
//   console.log(res)
// })

const { spawn } = require('child_process')

spawn('git', ['lg']).stdout.pipe(process.stdout)
