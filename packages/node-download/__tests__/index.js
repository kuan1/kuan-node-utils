const download = require('../lib')

/**
 * @description: 文件下载
 * @param {src} String 网络地址
 * @param {dir} String 下载文件夹
 * @param {dest} String 保存文件名字
 * @return: Promise
 */
const images = [
  {
    src: 'https://img1.halobear.com/pano/f79085cd610fc4ee1d8c8eee13d73b3b.zip',
    // dir: '',
    // dest: '',
  },
]

start()

async function start() {
  await download({
    images,
    // dir: 'images', // 保存文件夹
    // concurrentNum: 5, // 并发数量
    // 错误
    onError(e) {
      console.log(e.message)
    },
  })
  console.log('文件下载成功')
}
