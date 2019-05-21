const moment = require('moment')
const knex = require('knex')

// knex 简单封装增删改查
class MysqlHelper {
  constructor(config) {
    const { host, port, user, password, database } = config
    this.mysql = knex({
      client: 'mysql',
      connection: {
        host,
        port,
        user,
        password,
        database
      },
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 4500
    })
  }
  // 测试化创建时间、更新时间
  formatData(data = []) {
    const FORMAT = 'YYYY-MM-DD HH:mm:ss'
    data.forEach(item => {
      if (item.create_time) {
        item.create_time = moment(item.create_time).format(FORMAT)
      }
      if (item.update_time) {
        item.update_time = moment(item.update_time).format(FORMAT)
      }
    })
    return data
  }

  /**
   * 分页查询
   * @param dbName （数据库名字）
   * @param params (查询条件)
   * @returns {Promise<Object>}
   */
  async list(dbName, params = {}) {
    let { page = 1, size = 10000, ...condition } = params
    page = page > 1 ? page : 1
    const getData = this.mysql(dbName)
      .select()
      .limit(size)
      .offset((page - 1) * size)
      .where(condition)
      .orderBy('create_time', 'desc')
    const getTotal = this.mysql(dbName)
      .where(condition)
      .count('id as total')
    const [data, total] = await Promise.all([getData, getTotal])

    return {
      data: this.formatData(data),
      total: total.length ? total[0].total : 0
    }
  }

  /**
   * 查询详情
   * @param dbName （数据库名字）
   * @param detailId (id，默认拿params，query参数)
   * @returns {Promise<Object>}
   */
  async detail(dbName, id) {
    if (!id) throw new Error('id is NotFound')
    const data = await this.mysql(dbName)
      .select()
      .where('id', id)
    return data.length > 0 ? data[0] : {}
  }

  /**
   * 添加数据
   * @param ctx
   * @param dbName (数据库成功)
   * @param body (插入内容，或者使用发送的body)
   * @returns {Promise<Number>} (id)
   */
  async add(dbName, payload) {
    payload.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = await this.mysql(dbName).insert(payload)
    return data
  }

  /**
   * 更新数据
   * @param ctx
   * @param dbName
   * @param body (插入内容，或者使用发送的body)
   * @param key (查询条件)
   * @returns {Promise<null Number>}
   */
  async update(dbName, data, key = 'id') {
    const id = data[key]
    delete data.id
    const res = await this.mysql(dbName)
      .update(data)
      .where({
        [key]: id
      })
    return res
  }

  // 关闭连接
  destroy() {
    this.mysql.destroy()
  }
}

module.exports = MysqlHelper
