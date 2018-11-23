'use strict'

const { validate } = require('./../validations')
const operations = require('./../operations/uploads')
const schemas = require('./../validations/schemas/uploads')

async function create(ctx) {
  validate(schemas.create, ctx.request.body)

  const response = await operations.create(ctx.request.body)

  ctx.status = 201
  ctx.body = response
}

module.exports = {
  create,
}
