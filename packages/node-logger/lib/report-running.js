const chalk = require('chalk')
const address = require('address')

// 运行成功
function reportRunning(port) {
  const local = `http://localhost:${port}`
  const network = `http://${address.ip()}:${port}`
  console.log(
    [
      '',
      `app is running:`,
      `- Local:   ${chalk.cyan(local)}`,
      `- Network: ${chalk.cyan(network)}`,
      ''
    ].join('\n')
  )
}

module.exports = reportRunning