/**
 * User-generated media storage bucket
 */

# Inputs

variable "media-bucket" {
  default = "medias.serverless-resizer.com"
}

variable "apig-domain" {
  default = "b81diyiw1i.execute-api.eu-west-1.amazonaws.com"
}

variable "apig-path" {
  default = "/production/TODO"
}

# Resources

resource "aws_cloudfront_origin_access_identity" "media" {
  comment = "${var.media-bucket} access identity"
}

data "aws_iam_policy_document" "media" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.media-bucket}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.media.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${var.media-bucket}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.media.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "media" {
  bucket = "${var.media-bucket}"

  policy = "${data.aws_iam_policy_document.media.json}"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_cloudfront_distribution" "media" {
  enabled          = true
  retain_on_delete = true
  aliases          = ["${aws_s3_bucket.media.id}"]

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.media.id}"
    domain_name = "${aws_s3_bucket.media.bucket_domain_name}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.media.cloudfront_access_identity_path}"
    }
  }

  origin {
    origin_id   = "origin-api-gateway-${aws_s3_bucket.media.id}"
    domain_name = "${var.apig-domain}"
    origin_path = "${var.apig-path}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "origin-bucket-${aws_s3_bucket.media.id}"

    viewer_protocol_policy = "https-only"
    compress               = true

    max_ttl     = 31557600
    default_ttl = 31557600
    min_ttl     = 2592000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      # Make CloudFront respect S3 CORS settings
      headers = [
        "Origin",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
      ]
    }
  }

  ordered_cache_behavior {
    path_pattern = "images/*.*"

    allowed_methods  = ["HEAD", "GET", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "origin-api-gateway-${aws_s3_bucket.media.id}"

    viewer_protocol_policy = "https-only"
    compress               = true

    max_ttl     = 31557600
    default_ttl = 31557600
    min_ttl     = 2592000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      # Make CloudFront respect Lambda CORS settings
      headers = [
        "Origin",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
      ]
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Outputs

output "bucket-media" {
  value {
    id          = "${aws_s3_bucket.media.id}"
    domain_name = "${aws_s3_bucket.media.bucket_domain_name}"
    arn         = "${aws_s3_bucket.media.arn}"
  }
}

output "cloudfront-media" {
  value {
    id          = "${aws_cloudfront_distribution.media.id}"
    domain_name = "${aws_cloudfront_distribution.media.domain_name}"
    arn         = "${aws_cloudfront_distribution.media.arn}"
  }
}
