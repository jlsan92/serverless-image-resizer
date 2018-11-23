terraform {
  required_version = "~> 0.11.10"

  backend "s3" {
    bucket = "serverless-resizer-infrastructure"
    key    = "global.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {
  version = "~> 1.39.0"
  profile = "${var.aws-profile}"
  region  = "${var.aws-region}"
}

variable "aws-profile" {
  default = "serverless-resizer"
}

variable "aws-region" {
  default = "eu-west-1"
}
