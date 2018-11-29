'use strict'

const get = {
  type: 'object',
  required: ['key'],
  additionalProperties: false,
  properties: {
    key: {
      type: 'string',
    },
    width: {
      type: 'number',
      minimum: 10,
    },
    height: {
      type: 'number',
      minimum: 10,
    },
    toWebp: {
      type: 'boolean',
    },
    thumbnail: {
      type: 'boolean',
    },
  },
}

module.exports = {
  get,
}
