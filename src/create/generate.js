const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
const ask = require('./ask')
const { getOptions } = require('./utils')

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
    const metalsmith = Metalsmith(`${temp}/template`)

    const data = {
      ...metalsmith.metadata(),
      destDirName,
      inPlace,
      noEscape: true
    }

    metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles(opts))

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
  }
}

function renderTemplateFiles() {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    console.log(keys)
  }
}
