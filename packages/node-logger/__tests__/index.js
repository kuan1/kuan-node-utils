const logger = require('../lib/node-logger')

logger.run(8080)

setTimeout(() => {
  logger.clear()
}, 3000)


