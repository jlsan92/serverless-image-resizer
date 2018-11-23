'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('./middleware/errors')
const { authenticate } = require('./middleware/authentication')

const router = new Router()
router.use(handleErrors)

router.get('/', ctx => {
  ctx.status = 200
  ctx.body = {
    timestamp: Date.now(),
  }
})

router.get('/test', authenticate, ctx => {
  ctx.status = 200
  ctx.body = { message: 'secret data' }
})

router.use(handleNotFound)

module.exports = router.routes()