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
  services: {
    s3: {
      bucket: 'medias.serverless-resizer.com',
    },
  },
  operations: {
    uploads: {
      cdn: 'https://dummy-cdn.com',
      validContent: {
        png: {
          type: 'image',
          mime: 'image/png',
          extension: 'png',
          length: [0, 5242880],
        },
        jpeg: {
          type: 'image',
          mime: 'image/jpeg',
          extension: 'jpg',
          length: [0, 5242880],
        },
      },
    },
  },
})
