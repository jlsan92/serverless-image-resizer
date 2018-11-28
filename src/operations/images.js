'use strict'

const DynamoService = require('../services/dynamo-service')
const S3Service = require('../services/s3-service')
const ResizeService = require('../services/resize-service')
const errors = require('../utils/errors')

async function getAll() {
  const result = await DynamoService.getMedias()

  return result
}

async function get({ key, width, height, toWebp, thumbnail }) {
  let imageBuffer
  let imageMime

  try {
    const imageObject = await S3Service.getObject({ key: `images/${key}` })

    imageBuffer = imageObject.Body
    imageMime = imageObject.ContentType

    if (width || height || toWebp || thumbnail) {
      const resizedImage = await ResizeService.resizeImageBuffer({
        imageBuffer, width, height, toWebp, thumbnail,
      })

      imageBuffer = resizedImage.data
      imageMime = `image/${resizedImage.info.format}`
    }

    return { body: imageBuffer, mimeType: imageMime }
  } catch (err) {
    // S3 Object wasn't found
    if (err.code === 'NoSuchKey') {
      throw new errors.NotFoundError(`${key} not found`)
    }

    throw err
  }
}

module.exports = {
  getAll,
  get,
}
