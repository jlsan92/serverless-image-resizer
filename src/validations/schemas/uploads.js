'use strict'

const create = {
  type: 'object',
  required: ['contentType'],
  additionalProperties: false,
  properties: {
    contentType: {
      type: 'string',
    },
  },
}

module.exports = {
  create,
}
