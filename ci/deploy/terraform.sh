#!/usr/bin/env bash

set -o errexit
set -o pipefail

./bin/terraform apply -input=false global.tfplan
./bin/terraform output --json > infrastructure/global.outputs.json
