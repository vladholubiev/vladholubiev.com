provider "aws" {
  region  = "eu-central-1"
  version = "~> 1.2.0"
  profile = "vlad"
}

resource "aws_s3_bucket" "vladholubiev_tf_state" {
  bucket = "vladholubiev-tf-state"

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

resource "aws_s3_bucket" "vladholubiev_sls" {
  bucket = "vladholubiev-sls"
  region = "us-east-1"

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
    bucket  = "vladholubiev-tf-state"
    key     = "env-all/main.tfstate"
    encrypt = "true"
    region  = "eu-central-1"
    profile = "vlad"
  }
}
