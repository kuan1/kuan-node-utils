# @luzhongk/node-mysql

## Usage

```js
const MysqlHelper = require('@luzhongk/node-mysql')

const mysql = new MysqlHelper({
  host: '',
  port: '',
  user: '',
  password: '',
  database: ''
})

// mysql.list('kuan_article', { id: 55 }).then(res => {
//   console.log(res.data.length)
//   mysql.destroy()
// })

// mysql.detail('kuan_article', 55).then(res => {
//   console.log(res)
//   mysql.destroy()
// })

// mysql.add('work_version', { title: '测试' }).then(res => {
//   console.log(res)
//   mysql.destroy()
// })
```
