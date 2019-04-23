const inquirer = require('inquirer')

/**
 * 确认
 * @return {Promise}
 */
exports.confirm = async (message = 'are you confirm ?') => {
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message,
      name: 'ok'
    }
  ])
  return ok
}

/**
 * 选择
 * @return {Promise}
 */
exports.select = async (
  name = '选择',
  choices = ['选项1', '选项2', '选项3']
) => {
  const res = await inquirer.prompt({
    name,
    type: 'list',
    choices
  })
  return res
}
