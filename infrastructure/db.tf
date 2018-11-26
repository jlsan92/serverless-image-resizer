/**
 * Dynamo DB for bucket content
 */

# Inputs

variable "table-name" {
  default = "serverlessImages"
}

variable "hash-key" {
  default = "url"
}

variable "range-key" {
  default = "createdAt"
}

# Resources

resource "aws_dynamodb_table" "media" {
  name      = "${var.table-name}"
  hash_key  = "${var.hash-key}"
  range_key = "${var.range-key}"

  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "${var.hash-key}"
    type = "S"
  }

  attribute {
    name = "${var.range-key}"
    type = "N"
  }
}


# Outputs

output "db-media" {
  value {
    id          = "${aws_dynamodb_table.media.id}"
    arn         = "${aws_dynamodb_table.media.arn}"
  }
}
