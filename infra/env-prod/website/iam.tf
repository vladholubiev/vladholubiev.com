resource "aws_iam_user" "circle_ci_website" {
  name = "circle_ci_website"
  path = "/"
}

resource "aws_iam_user_policy" "deploy_website" {
  name = "deploy_website"
  user = "${aws_iam_user.circle_ci_website.name}"

  policy = "${data.aws_iam_policy_document.deploy_website.json}"
}

data "aws_iam_policy_document" "deploy_website" {
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:ListBucket",
      "s3:ListObjects",
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]

    resources = [
      "${aws_s3_bucket.vladholubiev_com.arn}*",
    ]
  }
}
