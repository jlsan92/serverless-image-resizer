'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const serverless = require('serverless-http')
const router = require('./routes')

const app = new Koa()

app.use(koaBody())

app.use(router)

module.exports.handler = serverless(app)
