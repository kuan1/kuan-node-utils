const rimraf = require('rimraf').sync
const { git } = require('../index')

// git clone github repository
module.exports = async function download(url) {
  const temp = '.temp'
  rimraf(temp)
  await git.clone(url, temp, '--depth', 1)
  rimraf(`${temp}/.git`)
}
