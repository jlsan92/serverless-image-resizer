'use strict'

const Ajv = require('ajv')
const errors = require('../utils/errors')
const logger = require('../utils/logger')

const ajv = new Ajv({ coerceTypes: true })

function validate(schema, inputData) {
  const validator = ajv.compile(schema)

  const valid = validator(inputData, schema)

  if (!valid) {
    logger.warn(validator.errors)
    throw new errors.ValidationError(ajv.errorsText(validator.errors))
  }
}

module.exports = {
  validate,
}
