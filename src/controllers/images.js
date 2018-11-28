'use strict'

const { validate } = require('./../validations')
const operations = require('./../operations/images')
const schemas = require('./../validations/schemas/images')

async function getAll(ctx) {
  const response = await operations.getAll()

  ctx.status = 200
  ctx.body = response
}

async function get(ctx) {
  const input = { ...ctx.query, ...ctx.params }

  validate(schemas.get, input)

  const { body, mimeType } = await operations.get(input)

  ctx.status = 200
  ctx.body = body
  ctx.type = mimeType
}

module.exports = {
  getAll,
  get,
}
