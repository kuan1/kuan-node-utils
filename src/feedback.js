const inquirer = require('inquirer')

async function confirm(message = 'are you confirm ?') {
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message,
      name: 'ok'
    }
  ])
  return ok
}

module.exports = {
  confirm
}
