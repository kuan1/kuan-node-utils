# @luzhongk/node-download

> nodejs 实现批量下载文件，支持并发下载/手动停止下载/返回 Promise

## Usage

```js
const download = require('@luzhongk/node-get')

const data = [
  {
    src: 'https://img1.halobear.com/pano/f79085cd610fc4ee1d8c8eee13d73b3b.zip',
    // dir: '',
    // dest: '',
  },
]

start()

async function start() {
  const options = {
    // 下载文件数组
    data,
    // 并发下载数量
    concurrentNum: 3,
    // 允许错误数量
    errorLimit: 1,
    // 下载进度
    onprogress(e, total) {
      console.log('剩余任务数量', total)
      e && console.log(e)
    },
  }

  await download(options)
  console.log('下载成功')
}
```
