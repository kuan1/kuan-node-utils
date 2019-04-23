const fs = require('fs')
const feedback = require('../feedback')

module.exports = (dir = '') => {
  if (fs.existsSync(dir)) {
    const ok = await feedback.confirm(`${dir} is exists! should remove ?`)
    if (!ok) {
      return false
    }
    rimraf(dir)
  }
}

