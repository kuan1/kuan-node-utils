const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const Axios = require('axios')

const axios = Axios.create()
axios.defaults.timeout = 30000

function writeFile(response, dest) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(dest)
    stream.on('close', resolve)
    stream.on('error', reject)
    response.data.pipe(stream)
  })
}

module.exports = async (src, dir, destImage) => {
  let dest = destImage || path.resolve(dir, path.basename(src).split('?')[0])
  if (!dest.includes('.')) {
    dest = `${dest}.jpg`
  }

  const exists = await fs.pathExists(dest)
  if (exists) {
    return console.log(chalk.green(`下载成功: ${src}`))
  }
  try {
    const response = await axios({
      url: src,
      responseType: 'stream',
    })
    await fs.ensureDir(path.dirname(dest))
    await writeFile(response, dest)
    console.log(chalk.green(`下载成功: ${src}`))
    return [null, src]
  } catch (e) {
    console.log(chalk.red(`下载错误: ${src}`), chalk.red(e.message))
    return [e, src]
  }
}
