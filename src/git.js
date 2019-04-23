const ora = require('ora')
const chalk = require('chalk')
const runCmd = require('./runCmd')

const git = {
  // git clone url --depth 1
  async clone(url, ...args) {
    const spinner = ora(chalk.cyan(`git clone ${url} ${args.join(' ')} \n`))
    spinner.start()
    const res = await runCmd('git', ['clone', url, ...args])
    spinner.stop()
    return res
  },
  async pull(...args) {
    const spinner = ora(`git pull ${args.join(' ')}...`)
    spinner.start()
    const res = await runCmd('git', ['pull', ...args])
    spinner.stop()
    return res
  },
  async push(...args) {
    const spinner = ora(`git push ${args}...`)
    spinner.start()
    const res = await runCmd('git', ['push', ...args])
    spinner.stop()
    return res
  }
}

module.exports = git
