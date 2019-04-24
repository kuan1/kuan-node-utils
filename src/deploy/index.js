const git = require('../git')
const runCmd = require('../runCmd')

function deploy(options = {}) {
  const {
    dist = 'dist',
    repository = git.repository(),
    shell = `${__dirname}/deploy.sh`
  } = options
  return runCmd('sh', [shell, dist, repository, shell])
}

module.exports = deploy
