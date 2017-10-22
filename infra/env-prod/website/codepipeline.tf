resource "aws_codepipeline" "website" {
  name     = "website"
  role_arn = "${aws_iam_role.codepipeline.arn}"

  artifact_store {
    location = "${data.aws_s3_bucket.codepipeline.id}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["MyApp"]

      configuration {
        Owner                = "vladgolubev"
        Repo                 = "vladholubiev.com"
        Branch               = "master"
        PollForSourceChanges = "true"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "CodeBuild"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["MyApp"]
      version          = "1"
      output_artifacts = ["MyAppBuild"]

      configuration {
        ProjectName = "${aws_codebuild_project.website.name}"
      }
    }
  }
}

data "aws_s3_bucket" "codepipeline" {
  bucket = "codepipeline-us-east-1-303900628897"
}

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
