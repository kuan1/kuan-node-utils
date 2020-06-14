const concurrent = require('./concurrent')
const download = require('./download')

const noop = () => {}

/**
 * 批量下载文件
 * @param {Array} params0.data 下载文件数据
 * @param {Number} params0.errorLimit 错误数量限制
 * @param {Number} params0.concurrentNum 并发任务数量
 * @param {Function} params0.onprogress 单个任务完成回调
 * @param {Object} ctrl 手动停止，ctrl.cancel && ctrl.cancel()
 * @returns {Promise}
 */
module.exports = (
  { data = [], errorLimit = 20, concurrentNum = 3, onprogress = noop },
  ctrl = {}
) => {
  return concurrent(
    {
      data,
      errorLimit,
      concurrentNum,
      onprogress,
      fn: download,
    },
    ctrl
  )
}
