resource "aws_s3_bucket" "main" {
  bucket = "tg-march2019-contest"
  acl    = "private"

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

resource "aws_s3_bucket_policy" "allow_public_read" {
  bucket = "${aws_s3_bucket.main.id}"
  policy = "${data.aws_iam_policy_document.allow_public_read.json}"
}

data "aws_iam_policy_document" "allow_public_read" {
  statement {
    sid    = "PublicReadGetObject"
    effect = "Allow"

    principals {
      type = "AWS"

      identifiers = [
        "*",
      ]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${aws_s3_bucket.main.bucket}/*",
    ]
  }
}
