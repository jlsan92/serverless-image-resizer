'use strict'

const AWS = require('aws-sdk')
const config = require('../config')

class S3Service {
  static $getInstance() {
    if (!this.instance) {
      this.instance = new AWS.S3({
        apiVersion: '2006-03-01',
        signatureVersion: 'v4',
      })
    }

    return this.instance
  }

  static getObject({
    bucket: Bucket = config.services.s3.bucket,
    key: Key,
  }) {
    const s3 = this.$getInstance()

    const params = {
      Bucket,
      Key,
    }

    return s3.getObject(params).promise()
  }

  static createSignedPost({
    bucket: Bucket = config.services.s3.bucket,
    key: Key,
    metadata,
  }) {
    const s3 = this.$getInstance()

    const params = {
      Bucket,
      Fields: {
        Key,
        'Content-Type': metadata.mime,
      },
      Conditions: [
        ['content-length-range', ...metadata.length],
      ],
    }

    return new Promise((resolve, reject) =>
      s3.createPresignedPost(params, (err, res) => {
        if (err) {
          return reject(err)
        }

        return resolve(res)
      }))
  }
}

module.exports = S3Service
