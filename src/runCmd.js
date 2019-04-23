const spawn = require('child_process').spawn
const logger = require('./logger')

function runCmd(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args)
    let resp = ''
    child.stdout.on('data', buffer => {
      resp += buffer.toString()
      console.log(resp)
    })
    child.stdout.on('error', error => {
      console.log(error)
      reject(error)
    })
    child.on('close', status => {
      if (status == 0) {
        logger.success('runcmd success!')
        logger.success(resp)
        resolve(resp)
      } else {
        logger.error(`runcmd error: ${status}!`)
        reject(resp)
      }
    })
  })
}

module.exports = runCmd
