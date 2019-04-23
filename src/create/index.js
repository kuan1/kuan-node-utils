const inquirer = require('inquirer')
const git = require('./git')
const ora = require('ora')
const logger = require('./logger')
const rimraf = require('rimraf').sync

// confirm
async function confirm(url, project) {
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message: `create boilerplate ${project} from ${url}`,
      name: 'ok'
    }
  ])
  return ok
}

// git clone
async function download(url) {
  const temp = '.temp'
  rimraf(temp)
  await git.clone(url, temp, '--depth', 1)
}

/**
 * Generate a template `project` from `remote`
 *
 * @param {String} remote 远程仓库
 * @param {String} project 当前仓库
 */
async function create(remote, project) {
  const url = `https://github.com/${remote}.git`
  const ok = await confirm(url, project)
  if (!ok) return false

  await download(url, project)
}

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1) // To exit with a 'failure' code
})

module.exports = create
