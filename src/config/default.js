'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  appName: pkg.name,
  version: pkg.version,
  auth: {
    secret: process.env.AUTH_SECRET || 'htfq4o3bcyriq4wyvtcbyrwqv3fy53bprogc',
  },
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
})
