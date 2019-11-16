# @luzhongk/node-feedback

## Usage

```js
const { confirm, select, input } = require('@luzhongk/node-feeback')

async function test() {
  await confirm('请确定开始?')
  const a = await select({
    name: 'name',
    message: '确定信息',
    choices: ['选项1', '选项2', '选项3']
  })
  console.log(a)
  const b = await input('输入内容')
  console.log(b)
}

test()
```
