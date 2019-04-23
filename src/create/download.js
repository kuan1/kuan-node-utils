const rimraf = require('rimraf').sync
const git = require('../git')

// git clone github repository
module.exports = async function download(url, temp) {
  await git.clone(url, temp, '--depth', 1)

  rimraf(`${temp}/.git`)
}
