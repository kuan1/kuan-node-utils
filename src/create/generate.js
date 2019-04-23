const { getOptions } = require('./utils')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 */

module.exports = (name, temp) => {
  const opts = getOptions(name, temp)
  console.log(opts)
}
