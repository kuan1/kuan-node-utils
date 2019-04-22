const spawn = require('child_process').spawn

function runCmd(cmd, args, callback) {
  return new Promise(resolve => {
    const child = spawn(cmd, args)
    let resp = ''
    child.stdout.on('data', buffer => {
      resp += buffer.toString()
      console.log(buffer)
    })
    child.stdout.on('end', () => {
      resolve(resp)
      if (callback) callback(resp)
    })
    child.stdout.on('error', error => {
      console.error(111, error)
      reject(error)
    })
  })
}

module.exports = runCmd
