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

  // 取消并发
  cancel() {
    // 任务已经失败或者取消直接返回
    if (this.errors.length >= this.errorLimit) return
    // 取消任务后，清空队列
    this.errorLimit = 0
    this.data = []
    this.errors.push(new Error('cancel'))
    this.onerror(this.errors)
  }

  async startItem() {
    const item = this.data.shift()
    if (!item) {
      return this.validateSuccess()
    }
    try {
      await this.fn(item)
      this.onprogress(null, this.total - 1)
    } catch (e) {
      this.validateError(e)
      this.onprogress(e, this.total - 1)
    }
    this.total -= 1
    this.startItem()
  }

  validateSuccess() {
    // 任务已经失败直接返回
    if (this.errors.length >= this.errorLimit) return
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
    }
  }
}

/**
 * 并发任务
 * @param {Object} options 配发任务配置
 * @param {Object} ctrl 是否返回Promise
 * @returns {Promise}
 */
module.exports = (options = {}, ctrl = {}) => {
  return new Promise((resolve, reject) => {
    const onsuccess = (e) => {
      ctrl.cancel = noop
      resolve(e)
    }
    const onerror = (e) => {
      ctrl.cancel = noop
      reject(e)
    }
    const con = new Concurrent(options, onsuccess, onerror)
    ctrl.cancel = con.cancel.bind(con)
  })
}
