//resource "aws_iam_role" "codebuild_assume" {
//  name = "codebuild-role"
//
//  assume_role_policy = <<EOF
//{
//  "Version": "2012-10-17",
//  "Statement": [
//    {
//      "Effect": "Allow",
//      "Principal": {
//        "Service": "codebuild.amazonaws.com"
//      },
//      "Action": "sts:AssumeRole"
//    }
//  ]
//}
//EOF
//}
//
//resource "aws_iam_policy" "codebuild_logs" {
//  name        = "codebuild-policy"
//  path        = "/service-role/"
//  description = "Policy used in trust relationship with CodeBuild"
//
//  policy = <<POLICY
//{
//  "Version": "2012-10-17",
//  "Statement": [
//    {
//      "Effect": "Allow",
//      "Resource": [
//        "*"
//      ],
//      "Action": [
//        "logs:CreateLogGroup",
//        "logs:CreateLogStream",
//        "logs:PutLogEvents"
//      ]
//    }
//  ]
//}
//POLICY
//}
//
//resource "aws_iam_policy_attachment" "codebuild_logs_assume" {
//  name       = "codebuild-policy-attachment"
//  policy_arn = "${aws_iam_policy.codebuild_logs.arn}"
//
//  roles = [
//    "${aws_iam_role.codebuild_assume.id}",
//  ]
//}
//
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

