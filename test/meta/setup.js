'use strict'

const sinon = require('sinon')
const expect = require('expect')

// Make sure our tests always run in the 'test' environment
// eslint-disable-next-line no-process-env
process.env.NODE_ENV = 'test'

global.expect = expect
global.sinon = sinon
