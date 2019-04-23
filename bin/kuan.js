#!/usr/bin/env node

const program = require('commander')
const { create } = require('../src')

program
  .version(require('../package').version, '-v, --version')
  .command('create <remote> <project>')
  .description('generate a project from a remote template (legacy API)')
  .action((remote, project) => {
    create(remote, project)
  })

program.parse(process.argv)

if (program.args.length < 1) return program.help()
