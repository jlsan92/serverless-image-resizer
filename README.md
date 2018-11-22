# Serverless Image Resizer

[![Build Status][travis-badge]][travis-home]
[![Coverage Status][codecov-badge]][codecov-home]

## Prerequisites

- Node.js (see _package.json_ for compatible version range)
- posix-compatible environment with `bash`, `make` etc.
- Serverless Framework

## Installing

- Clone this repo
- Create or edit your _~/.aws/credentials_ file and add a profile named `serverless-resizer` with valid credentials:
```ini
[serverless-resizer]
aws_access_key_id =
aws_secret_access_key =
aws_region = eu-east-1
```
- `make` - This will install all dependencies

## Usage

TODO

## Infrastructure

- [AWS][aws-login]

Infrastructure is managed using [Terraform][terraform-home]. The configuration files can be found in the [infrastructure](infrastructure) directory.

### Requirements

To run terraform commands locally, you need to have the following set up:

- An `serverless-resizer` AWS profile defined in your _~/.aws/credentials_ file

### Terraform utility

You need not have `terraform` installed on your computer - you can use the local `./bin/terraform` command to run anything terraform-related, ie.:

- `terraform init`: Required before executing any command
- `terraform fmt`: Lint and re-format terraform files
- `terraform plan`: Show what terraform will do to the infrastructure to match current configuration
- `terraform apply`: **(DO NOT RUN LOCALLY)** Apply changes to the infrastructure

It is a docker container wrapper that behaves like a locally installed CLI utility. 💪

[travis-badge]: https://travis-ci.com/jlsan92/serverless-image-resizer.svg?branch=master
[travis-home]: https://travis-ci.com/jlsan92/serverless-image-resizer
[codecov-badge]: https://codecov.io/gh/jlsan92/serverless-image-resizer/branch/master/graph/badge.svg
[codecov-home]: https://codecov.io/gh/jlsan92/serverless-image-resizer
[aws-login]: https://console.aws.amazon.com/console/home
[terraform-home]: https://www.terraform.io
