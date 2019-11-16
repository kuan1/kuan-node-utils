const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const { input } = require('./utils/feedback')

function getJson(name = '插件名字', description = '插件描述') {
  return {
    name: `@luzhongk/${name}`,
    version: '0.0.4',
    description,
    keywords: ["node"],
    scripts: {
      dev: `node __tests__`,
      version:
        "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 --commit-path '.'"
    },
    author: 'luzhongkuan <luzhongk@126.com>',
    homepage: `https://github.com/kuan1/kuan-node-utils/tree/master/packages/${name}`,
    license: 'ISC',
    main: `lib/${name}.js`,
    directories: {
      lib: 'lib'
    },
    files: ['lib'],
    publishConfig: {
      access: 'public'
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/kuan1/kuan-node-utils.git'
    },
    bugs: {
      url: 'https://github.com/kuan1/kuan-node-utils/issues'
    },
    dependencies: {},
    devDependencies: {}
  }
}

function isExist(name) {
  const dir = path.resolve(__dirname, '../packages', name, 'package.json')
  return fs.existsSync(dir)
}

async function createJson() {
  const name = await input('请输入插件名字')
  if (isExist(name)) return console.error(chalk.red(`${name}插件已经存在了`))
  const desc = await input('请输入插件描述')
  const json = getJson(name, desc)
  fs.writeFileSync(
    `${__dirname}/package.json`,
    JSON.stringify(json, null, 2),
    'utf-8'
  )
  console.log(chalk.green(`${name}json创建成功`))
}

createJson()
