provider "aws" {
  region  = "eu-central-1"
  version = "~> 0.1.4"
}

resource "aws_s3_bucket" "vlad_tf_state" {
  bucket = "vlad-tf-state"
  acl    = "private"

  lifecycle {
    prevent_destroy = true
  }

  tags {
    Terraform = true
  }

  versioning {
    enabled = true
  }
}

terraform {
  backend "s3" {
    acl     = "private"
    bucket  = "vlad-tf-state"
    key     = "env-all/main.tfstate"
    encrypt = "true"
    region  = "eu-central-1"
  }
}
