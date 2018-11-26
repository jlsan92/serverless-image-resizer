/* eslint-disable id-length */
'use strict'

const AWS = require('aws-sdk')
const config = require('../config')

class DynamoService {
  static $getInstance() {
    if (!this.instance) {
      this.instance = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
      })
    }

    return this.instance
  }

  static saveMedia({ createdAt, url }) {
    const db = this.$getInstance()

    const params = {
      Item: {
        createdAt: {
          N: `${createdAt}`,
        },
        url: {
          S: url,
        },
      },
      TableName: `${config.services.dynamo.table}`,
    }

    console.log(params)

    return db.putItem(params).promise()
  }
}

module.exports = DynamoService
