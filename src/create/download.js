const rimraf = require('rimraf').sync
const fs = require('fs')
const feedback = require('../feedback')
const git = require('../git')

// git clone github repository
module.exports = async function download(url, temp) {
  if (fs.existsSync(temp)) {
    const ok = await feedback.confirm(`${temp} is exists! should remove ?`)
    if (!ok) {
      return false
    }
  }

  await git.clone(url, temp, '--depth', 1)

  rimraf(`${temp}/.git`)
}
