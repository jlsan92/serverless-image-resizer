'use strict'

const AWS = require('aws-sdk')
const config = require('../config')

class DynamoService {
  static $getInstance() {
    if (!this.instance) {
      this.instance = new AWS.DynamoDB.DocumentClient()
    }

    return this.instance
  }

  static saveMedia({ createdAt, url }) {
    const db = this.$getInstance()

    const params = {
      Item: {
        createdAt,
        url,
      },
      TableName: config.services.dynamo.table,
    }

    return db.put(params).promise()
  }

  static getMedias() {
    const db = this.$getInstance()

    const params = {
      TableName: config.services.dynamo.table,
    }

    return db.scan(params).promise()
  }
}

module.exports = DynamoService
