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
    },
    height: {
      type: 'number',
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
