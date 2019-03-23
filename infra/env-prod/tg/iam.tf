resource "aws_iam_user" "ci_tg" {
  name = "ci_tg"
  path = "/"
}

resource "aws_iam_user_policy" "ci_tg" {
  name = "ci_tg"
  user = "${aws_iam_user.ci_tg.name}"

  policy = "${data.aws_iam_policy_document.ci_tg.json}"
}

data "aws_iam_policy_document" "ci_tg" {
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:GetObjectVersion",
      "s3:ListBucket",
      "s3:ListObjects",
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]

    resources = [
      "${aws_s3_bucket.main.arn}*",
    ]
  }
}
