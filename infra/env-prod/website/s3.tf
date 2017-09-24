resource "aws_s3_bucket" "vladholubiev_com" {
  bucket = "${var.domain}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  lifecycle {
    prevent_destroy       = true
    create_before_destroy = true
  }

  tags {
    Terraform   = true
    Environment = "${var.env}"
  }
}
