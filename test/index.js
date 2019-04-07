const { execSync } = require('child_process')

const res = execSync('ls')
console.log(res.toString())
