const { logger } = require('../src')

for (let i = 0; i < 100; i++) {
  console.log(i)
}

logger.clearConsole('清空完毕')

logger.log('测试', 'log')
logger.warn('测试', 'warn')
logger.error('测试', 'error')
logger.success('测试', 'success')