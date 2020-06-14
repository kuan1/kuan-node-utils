const concurrent = require('./concurrent')
const download = require('./download')

const noop = () => {}

/**
 * 批量下载文件
 * @param {Array} params0.data 下载文件数据
 * @param {Number} params0.errorLimit 错误数量限制
 * @param {Number} params0.concurrentNum 并发任务数量
 */
module.exports = ({ data = [], errorLimit = 20, onprogress = noop, concurrentNum = 3 }) => {
  return concurrent({
    data,
    onprogress,
    errorLimit,
    concurrentNum,
    fn: download,
  })
}
