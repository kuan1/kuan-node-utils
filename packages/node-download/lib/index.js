const path = require('path')
const download = require('./download')

const defaults = {
  images: [], // 要下载的图片列表 {src: '', dir: '', dest = ''}
  dir: path.resolve(process.cwd(), '.download'), // 下载文件夹
  concurrentNum: 5, // 并发数量
}

class ImageDownload {
  constructor(options, onSuccess = () => {}) {
    Object.assign(this, defaults, options)
    this.success = onSuccess
    this.onError = options.onError
    this.total = this.images.length
    this.init()
  }

  init() {
    if (!this.images.length) {
      return this.success()
    }
    for (let i = 0; i < this.concurrentNum; i++) {
      this.toDownload()
    }
  }

  async toDownload() {
    const item = this.images.shift()
    if (!item) {
      return this.validateSuccess()
    }
    const { src = '', dir = this.dir, dest } = item
    const [e] = await download(src, dir, dest)
    if (e && this.onError) {
      this.onError(e, src)
    }

    this.total -= 1
    this.toDownload()
  }

  validateSuccess() {
    if (this.total <= 0) {
      this.success()
    }
  }
}

module.exports = (options = {}) => {
  return new Promise((resolve) => {
    new ImageDownload(options, resolve)
  })
}
