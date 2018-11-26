'use strict'

const DynamoService = require('./services/dynamo-service')
const logger = require('./utils/logger')
const config = require('./config')

module.exports.handler = async (event, context, cb) => {
  logger.info('request id', context.awsRequestId)

  const key = event.Records[0].s3.object.key

  try {
    const newImage = {
      createdAt: Date.now(),
      url: `${config.operations.uploads.cdn}/${key}`,
    }

    await DynamoService.saveMedia(newImage)

    return cb()
  } catch (err) {
    logger.error(err)
    return cb(err)
  }
}
