/**
 * mysql helper
 * author: luzhongk@126.com
 */

const moment = require('moment')
const db = require('../utils/mysql.js') // knex

function formatData(data = []) {
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
 * @param ctx (koa ctx对象)
 * @param dbName （数据库名字）
 * @param condition (查询条件)
 * @returns {Promise<Object>}
 */
const list = async (ctx, dbName, condition = {}) => {
  let {
    // eslint-disable-next-line
    page = 1, size = 1000
  } = ctx.query
  page = page > 1 ? page : 1
  if (ctx.query.condition && !Object.keys(condition).length) condition = JSON.parse(ctx.query.condition)
  const getContent = db(dbName)
    .select()
    .limit(size)
    .offset((page - 1) * size)
    .where(condition)
    .orderBy('create_time', 'desc')
  const getTotal = db(dbName).where(condition).count('id as total')
  const [content, total] = await Promise.all([getContent, getTotal])

  const data = {
    content: formatData(content),
    total: total.length ? total[0].total : 0
  }
  ctx.state.data = data
  return data
}

/**
 * 查询详情
 * @param ctx (koa ctx对象)
 * @param dbName （数据库名字）
 * @param detailId (id，默认拿params，query参数)
 * @returns {Promise<Object>}
 */
const detail = async (ctx, dbName, detailId) => {
  let {
    id
  } = ctx.params || ctx.query
  if (detailId) id = detailId
  if (!id) ctx.throw(400, 'id not found')
  const data = await db(dbName).select().where('id', id)
  ctx.state.data = data.length > 0 ? data[0] : {}
  return ctx.state.data
}

/**
 * 添加数据
 * @param ctx
 * @param dbName (数据库成功)
 * @param body (插入内容，或者使用发送的body)
 * @returns {Promise<Number>} (id)
 */
const add = async (ctx, dbName, body) => {
  const payload = body || ctx.request.body
  payload.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
  const data = await db(dbName).insert(payload)
  ctx.state.data = data
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
const update = async (ctx, dbName, body, key = 'id') => {
  const data = body || ctx.request.body
  const id = data[key]
  if (!id) ctx.throw(400, 'id not found')
  delete data.id
  const res = await db(dbName).update(data).where({
    [key]: id
  })
  ctx.state.data = res
  return res
}

/**
 * 删除数据
 * @param ctx
 * @param dbName
 * @param removeId
 * @returns {Promise<*>}
 */
const remove = async (ctx, dbName, removeId) => {
  let {
    id
  } = ctx.params || ctx.query
  if (removeId) id = removeId
  if (!id) ctx.throw(400, 'id not found')
  if (id === 'all') {
    const data = await db(dbName).truncate() // 清空表
    ctx.state.data = '成功'
    return data
  } else {
    const data = await db(dbName).where('id', id).del()
    ctx.state.data = data
    return data
  }
}

module.exports = {
  detail,
  list,
  add,
  update,
  remove
}
