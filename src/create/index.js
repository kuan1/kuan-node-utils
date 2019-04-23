const { feedback } = require('../index')
const download = require('./download')

/**
 * Generate a template `project` from `remote`
 *
 * @param {String} remote 远程仓库
 * @param {String} project 当前仓库
 */
async function create(remote, project) {
  // 确认是否生成项目
  const url = `https://github.com/${remote}.git`
  const ok = await feedback.confirm(`create boilerplate ${project} from ${url}`)
  if (!ok) return false

  // 从github下载项目
  await download(url)
}

// To exit with a 'failure' code
process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1)
})

module.exports = create
