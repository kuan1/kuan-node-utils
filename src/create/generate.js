const { getOptions } = require('./utils')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 */

module.exports = (name, src) => {
  const opts = getOptions(name, src)
  console.log(opts)
}
