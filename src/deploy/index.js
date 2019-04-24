const execFileSync = require('child_process').execFileSync
const rimraf = require('rimraf').sync
const ora = require('ora')
const git = require('../git')
const resolve = require('../resolve')
const feedback = require('../feedback')

/**
 * 根据用户输入重写options
 * @param {*} [options={}]
 * @param {*} callback
 */
async function getOptions(options = {}, callback) {
  const {
    dist = 'dist',
    repository = git.repository(),
    branch = 'dist',
    shell = `${__dirname}/deploy.sh`
  } = options
  options.dist = await feedback.input('文件打包路径', dist)
  rimraf(resolve(options.dist, '.git')) // 删除.git文件
  options.repository = await feedback.input('远程仓库地址', repository)
  options.branch = await feedback.input('推送分支', branch)
  const shellPath = await feedback.input('部署shell脚本', shell)
  options.shell = getShellPath(shellPath)
  callback(options)
}

/**
 * 获取正确shell地址
 */
function getShellPath(shellPath) {
  return shellPath.startsWith('/') ? shellPath : resolve(shellPath)
}

/**
 * 自动推送git
 * @param {String} config.dist 打包地址
 * @param {String} config.repository git仓库地址
 * @param {String} config.barnch 推送分支
 * @param {String} config.shell shell地址
 * @returns
 */
function deploy(config = {}) {
  return new Promise((resolve, reject) => {
    getOptions(config, options => {
      const { dist, repository, branch, shell } = options
      const spinner = ora('starting auto deploy')
      spinner.start()
      try {
        const stdout = execFileSync('sh', [shell, dist, repository, branch])
        console.log(stdout.toString())
        resolve(stdout)
        spinner.stop()
      } catch (err) {
        console.log(err.output.toString())
        resolve(err)
        spinner.stop()
      }
    })
  })
}

module.exports = deploy
