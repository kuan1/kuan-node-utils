const defaults = {
  data: [], // 数据队列
  fn: () => {}, // 执行函数
  concurrentNum: 3, // 并发数量
  errorLimit: 20, // 错误停止数量
  onprogress: () => {}, // 任务进行进度
}

const noop = () => {}

class Concurrent {
  constructor(options, onsuccess = noop, onerror = noop) {
    Object.assign(this, defaults, options)
    this.errors = []
    this.onsuccess = onsuccess
    this.onerror = onerror
    this.total = this.data.length
    this.init()
  }

  init() {
    if (!this.data.length) {
      return this.onsuccess()
    }
    for (let i = 0; i < this.concurrentNum; i++) {
      this.startItem()
    }
  }

  async startItem() {
    const item = this.data.shift()
    if (!item) {
      return this.validateSuccess()
    }
    try {
      await this.fn(item)
    } catch (e) {
      this.validateError(e)
    }
    this.total -= 1
    this.startItem()
  }

  validateSuccess() {
    // 任务已经失败直接返回
    if (this.errors.length >= this.errorLimit) return
    this.onprogress(null, this.total)
    if (this.total <= 0) {
      this.onsuccess()
    }
  }

  validateError(e) {
    // 任务已经失败直接返回
    if (this.errors.length >= this.errorLimit) return

    this.errors.push(e)
    if (this.errors.length === this.errorLimit) {
      this.onerror(this.errors)
    } else {
      this.onprogress(e, this.total)
    }
  }
}

module.exports = (options = {}) => {
  return new Promise((resolve, reject) => {
    new Concurrent(options, resolve, reject)
  })
}
