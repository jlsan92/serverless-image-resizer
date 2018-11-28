'use strict'

const sharp = require('sharp')

class ResizeService {
  static async resizeImageBuffer({ imageBuffer, width, height, toWebp = false, thumbnail }) {
    if (thumbnail) {
      width = 16
      height = 16
    }

    let resizedImage = await sharp(Buffer.from(imageBuffer))
      .resize({
        width: width ? Number(width) : void 0,
        height: height ? Number(height) : void 0,
        fit: 'outside',
        withoutEnlargement: true,
      })
      .toBuffer({ resolveWithObject: true })

    if (toWebp) {
      resizedImage = await sharp(resizedImage.data)
        .webp()
        .toBuffer({ resolveWithObject: true })
    }

    return resizedImage
  }
}

module.exports = ResizeService
