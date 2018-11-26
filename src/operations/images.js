'use strict'

const DynamoService = require('../services/dynamo-service')

async function getAll() {
  const result = await DynamoService.getMedias()

  return result
}

module.exports = {
  getAll,
}
