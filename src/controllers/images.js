'use strict'

const operations = require('./../operations/images')

async function getAll(ctx) {
  const response = await operations.getAll()

  ctx.status = 200
  ctx.body = response
}

module.exports = {
  getAll,
}
