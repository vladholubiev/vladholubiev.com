resource "aws_iam_role" "codebuild" {
  name = "code-build-website-service-role"
  path = "/service-role/"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

data "aws_iam_policy_document" "codebuild" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = [
      "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/website",
      "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/website:*",
    ]
  }

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
      "arn:aws:s3:::codepipeline-us-east-1-*",
      "${aws_s3_bucket.vladholubiev_com.arn}*",
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "ssm:GetParameters",
    ]

    resources = [
      "arn:aws:ssm:us-east-1:*:parameter/CodeBuild/*",
    ]
  }
}

resource "aws_iam_policy" "codebuild_trust" {
  name        = "CodeBuildTrustPolicy-website-1508642482406"
  path        = "/service-role/"
  description = "Policy used in trust relationship with CodeBuild"

  policy = "${data.aws_iam_policy_document.codebuild.json}"
}

resource "aws_iam_role_policy_attachment" "codebuild" {
  role       = "${aws_iam_role.codebuild.name}"
  policy_arn = "${aws_iam_policy.codebuild_trust.arn}"
}

//resource "aws_codebuild_project" "website" {
//  name          = "${var.env}_website"
//  description   = "Builds website and deploys static HTML to S3"
//  build_timeout = "5"
//  service_role  = "${aws_iam_role.codebuild_assume.arn}"
//
//  artifacts {
//    type = "NO_ARTIFACTS"
//  }
//
//  environment {
//    compute_type = "BUILD_GENERAL1_SMALL"
//    image        = "2"
//    type         = "LINUX_CONTAINER"
//  }
//
//  source {
//    type     = "GITHUB"
//    location = "https://github.com/vladgolubev/packer.git"
//  }
//
//  tags {
//    "Environment" = "Test"
//  }
//}
//

