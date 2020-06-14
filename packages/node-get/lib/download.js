const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const Axios = require('axios')

const axios = Axios.create()
axios.defaults.timeout = 30000
const defaultDir = path.resolve(process.cwd(), '.download') // 下载文件夹

function writeFile(response, dest) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(dest)
    stream.on('close', resolve)
    stream.on('error', reject)
    response.data.pipe(stream)
  })
}

/**
 * @param {string} src 文件下载地址
 * @param {string} dir 文件下载目录
 * @param {string} dest 文件完整地址（如果没有截取下载地址目录）
 */
module.exports = async ({ src = '', dir = defaultDir, dest: destImage }) => {
  const dest = destImage || path.resolve(dir, path.basename(src).split('?')[0])
  const exists = await fs.pathExists(dest)
  if (exists) {
    return console.log(chalk.cyan(`缓存跳过: ${src}`))
  }
  try {
    const response = await axios({
      url: src,
      responseType: 'stream',
    })
    await fs.ensureDir(path.dirname(dest))
    await writeFile(response, dest)
    console.log(chalk.green(`下载成功: ${src}`))
    return src
  } catch (e) {
    console.log(chalk.red(`下载错误: ${src}`), chalk.red(e.message))
    return Promise.reject(e)
  }
}
