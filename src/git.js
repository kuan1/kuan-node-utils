const ora = require('ora')
const logger = require('./logger')
const runCmd = require('./runCmd')

const git = {
  // git clone url --depth 1
  async clone(url, ...args) {
    const spinner = ora(`git clone ${url} ${args.join(' ')}...`)
    spinner.start()
    const res = await runCmd('git', ['clone', url, ...args])
    spinner.stop()
    logger.success('success!')
    return res
  },
  async pull(...args) {
    const spinner = ora(`git pull ${args.join(' ')}...`)
    spinner.start()
    const res = await runCmd('git', ['pull', ...args])
    spinner.stop()
    logger.success('success!')
    return res
  },
  async push(...args) {
    const spinner = ora(`git push ${args}...`)
    spinner.start()
    const res = await runCmd('git', ['push', ...args])
    spinner.stop()
    logger.success('success!')
    return res
  }
}

module.exports = git
