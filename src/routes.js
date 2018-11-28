'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('./middleware/errors')
// const { authenticate } = require('./middleware/authentication')
const uploads = require('./controllers/uploads')
const images = require('./controllers/images')

const router = new Router()
router.use(handleErrors)

router.get('/', ctx => {
  ctx.status = 200
  ctx.body = {
    timestamp: Date.now(),
  }
})

router.post('/uploads', uploads.create)

router.get('/images', images.getAll)
router.get('/images/:key', images.get)

router.use(handleNotFound)

module.exports = router.routes()
