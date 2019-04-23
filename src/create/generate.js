const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
const { getOptions, ask } = require('./utils')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 */

module.exports = (name, temp) => {
  return new Promise((resolve, reject) => {
    const inPlace = name === '.'
    const destDirName = inPlace ? process.cwd() : `${process.cwd()}/${name}`
    const opts = getOptions(name, temp)
    console.log(temp)
    const metalsmith = Metalsmith(temp)

    console.log(1234)

    const data = {
      ...metalsmith.metadata(),
      destDirName,
      inPlace,
      noEscape: true
    }

    console.log(1234, data)

    // metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles(opts))

    metalsmith
      .clean(false)
      .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
      .destination(destDirName)
      .build((err, files) => {
        if (err) return reject(err)
        console.log(files)
      })
    return data
  })
}

function askQuestions(prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
    done()
    // ask(prompts, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles() {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    console.log(keys)
  }
}
