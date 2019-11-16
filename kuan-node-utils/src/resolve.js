const path = require('path')

const cwd = process.cwd()

// 根目录路径
function resolve(...dir) {
  if (dir.length === 1 && dir[0].startsWith('/')) return dir[0]
  return path.resolve(cwd, ...dir)
}

module.exports = resolve
