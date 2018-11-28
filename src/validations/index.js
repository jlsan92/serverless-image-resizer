'use strict'

const Ajv = require('ajv')
const errors = require('../utils/errors')
const logger = require('../utils/logger')

const validator = new Ajv({ coerceTypes: true })

function validate(schema, inputData) {
  console.dir({ schema, inputData }, { depth: null })

  const valid = validator.validate(inputData, schema)

  console.log(valid)
  if (!valid) {
    logger.info(validator.errors)
    throw new errors.ValidationError(validator.errors)
  }
}

module.exports = {
  validate,
}
