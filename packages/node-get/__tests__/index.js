const download = require('../lib')

const data = [
  {
    src: 'https://img1.halobear.com/pano/f79085cd610fc4ee1d8c8eee13d73b3b.zip',
    // dir: '',
    // dest: '',
  },
  {
    src: 'http://pic.kuan1.top/f7587935f6263980fc6f1fab221bd6ba.jpeg',
    // dir: '',
    // dest: '',
  },
  {
    src: 'http://pic.kuan1.top/e341eb0380876c42d1ef6f65e291e353.png11',
    // dir: '',
    // dest: '',
  },
  {
    src: 'http://pic.kuan1.top/77c1ba89bb567eb94160c14a6a82320b.png',
    // dir: '',
    // dest: '',
  },
]

const ctrl = {}
start()

async function start() {
  const options = {
    // 下载文件数组
    data,
    // 允许错误数量
    errorLimit: 1,
    // 下载进度
    onprogress(e, total) {
      console.log('剩余任务数量', total)
      e && console.log(e)
      // 取消任务
      ctrl.cancel()
    },
  }

  try {
    await download(options, ctrl)
    console.log('任务下载成功')
  } catch (e) {
    console.log('失败', e)
  }
}
