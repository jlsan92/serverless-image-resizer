'use strict'

const fs = require('fs')
const yaml = require('js-yaml')


module.exports.mimeTypes = () => {
  // eslint-disable-next-line no-sync
  const serverlessFile = yaml.safeLoad(fs.readFileSync('./serverless.yaml', 'utf8'))

  return JSON.stringify(serverlessFile.custom.mimeTypes)
}
