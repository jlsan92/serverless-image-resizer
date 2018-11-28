'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const serverless = require('serverless-http')
const logger = require('koa-pino-logger')
const router = require('./routes')

// eslint-disable-next-line no-process-env
const validMimeTypes = process.env.MIME_TYPES

const app = new Koa()

app.use(logger())
app.use(koaBody())

app.use(router)

module.exports.handler = serverless(app, {
  binary: JSON.parse(validMimeTypes),
})

