resource "aws_iam_role" "codepipeline" {
  name = "prod_codepipeline_assume"
  path = "/"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

//resource "aws_codepipeline" "foo" {
//  name     = "tf-test-pipeline"
//  role_arn = "${aws_iam_role.foo.arn}"
//
//  artifact_store {
//    location = "${aws_s3_bucket.foo.bucket}"
//    type     = "S3"
//  }
//
//  stage {
//    name = "Source"
//
//    action {
//      name             = "Source"
//      category         = "Source"
//      owner            = "ThirdParty"
//      provider         = "GitHub"
//      version          = "1"
//      output_artifacts = ["test"]
//
//      configuration {
//        Owner      = "my-organization"
//        Repo       = "test"
//        Branch     = "master"
//      }
//    }
//  }
//
//  stage {
//    name = "Build"
//
//    action {
//      name            = "Build"
//      category        = "Build"
//      owner           = "AWS"
//      provider        = "CodeBuild"
//      input_artifacts = ["test"]
//      version         = "1"
//
//      configuration {
//        ProjectName = "test"
//      }
//    }
//  }
//}

