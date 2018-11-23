'use strict'

const config = require('../config')
const appErrors = require('../utils/errors')

function authenticate(ctx, next) {
  if (!ctx) {
    throw new Error('Context has to be defined')
  }
  const token = ctx.header.authorization

  if (!token || token !== config.auth.secret) {
    throw new appErrors.UnauthorizedError()
  }

  return next()
}

module.exports = {
  authenticate,
}
