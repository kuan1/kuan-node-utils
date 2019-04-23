const inquirer = require('inquirer')
const ora = require('ora')
const logger = require('./logger')

// 确认生成
async function confirm(remote, project) {
  const projectName = project ? ' from  + remote' : ''
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message: `create ${project} ${remote}${projectName}`,
      name: 'ok'
    }
  ])
  return ok
}

/**
 * Generate a template `project` from `remote`
 *
 * @param {String} remote 远程仓库
 * @param {String} project 当前仓库
 */
async function create(remote, project) {
  const ok = await confirm(remote, project)
  if (!ok) return false
}

module.exports = create
