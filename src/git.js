const runCmd = require('./runCmd')

const git = {
  // git clone url --depth 1
  clone(url, ...args) {
    console.log('git clone ...')
    return runCmd('git', ['clone', url, ...args])
  },
  pull(...args) {
    console.log('git pull ...')
    return runCmd('git', ['pull', ...args])
  },
  push(...args) {
    console.log('git push ...')
    return runCmd('git', ['push', ...args])
  }
}

module.exports = git
