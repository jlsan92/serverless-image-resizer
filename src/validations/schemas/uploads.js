'use strict'

const create = {
  type: 'object',
  required: ['contentType'],
  properties: {
    contentType: {
      type: 'string',
    },
  },
}

module.exports = {
  create,
}
