const chalk = require('chalk')
const readline = require('readline')
const ip = require('ip')

// 运行成功
exports.run = port => {
  const local = `http://localhost:${port}`
  const network = `http://${ip.address()}:${port}`
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

// 清空日志
exports.clear = title => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}
