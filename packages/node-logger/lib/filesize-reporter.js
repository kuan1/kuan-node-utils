const fs = require('fs')
const chalk = require('chalk')
const recursive = require('recursive-readdir')
const gzipSize = require('gzip-size').sync
const ui = require('cliui')({ width: process.stdout.columns || 80 })

function formatSize(size) {
  return (size / 1024).toFixed(2) + ' KiB'
}

function measureFileSizes(folder) {
  return new Promise(resolve => {
    recursive(folder, (err, fileNames) => {
      let sizes
      if (!err && fileNames) {
        sizes = fileNames.reduce((memo, fileName) => {
          const contents = fs.readFileSync(fileName)
          memo.push({
            File: fileName.replace(folder, '').replace(/^\//, ''),
            Size: formatSize(contents.length),
            Gzipped: formatSize(gzipSize(contents))
          })
          return memo
        }, [])
      }
      resolve({
        root: folder,
        sizes: sizes || [],
      })
    })
  })
}

function makeRow(a, b, c) {
  return `  ${a}\t    ${b}\t ${c}`
}


module.exports = (folder) => {
  measureFileSizes(folder).then(({ sizes }) => {
    ui.div(
      makeRow(
        chalk.cyan.bold(`File`),
        chalk.cyan.bold(`Size`),
        chalk.cyan.bold(`Gzipped`)
      ) + `\n\n` +
      sizes.map(asset => makeRow(
        /js$/.test(asset.name)
          ? chalk.green(asset.File)
          : chalk.blue(asset.File),
        asset.Size,
        asset.Gzipped
      )).join(`\n`)
    )

    console.log(ui.toString())
  })
}