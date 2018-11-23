'use strict'

const uuid = require('uuid')
const errors = require('../utils/errors')
const S3Service = require('../services/s3-service')
const config = require('../config')

async function create(data) {
  const { validContent, cdn } = config.operations.uploads

  const valid = Object.values(validContent).find(content => content.mime === data.contentType)

  if (!validContent) {
    throw new errors.ValidationError(`'${data.contentType}' is not supported`)
  }

  const extension = valid.extension

  const key = `${uuid.v4()}.${extension}`

  const result = await S3Service.createSignedPost({ key, metadata: valid })

  result.url = cdn

  return result
}

module.exports = {
  create,
}
