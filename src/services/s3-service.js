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

  static createSignedPost({
    bucket = config.services.s3.bucket,
    key,
    metadata,
  }) {
    const s3 = this.$getInstance()

    const params = {
      Bucket: bucket,
      Fields: {
        key,
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
