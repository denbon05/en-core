data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_caller_identity" "current" {}
data "aws_elb_service_account" "elb_account_id" {}

data "aws_iam_policy_document" "allow_lb" {
  statement {
    sid    = "ALBAccessLogsWrite"
    effect = "Allow"
    actions = [
      "s3:PutObject"
    ]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.lb_logs.bucket}/AWSLogs/${data.aws_caller_identity.current.account_id}/*"
    ]
    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::${data.aws_elb_service_account.elb_account_id.id}:root"
      ]
    }
  }

  statement {
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.lb_logs.bucket}/AWSLogs/${data.aws_caller_identity.current.account_id}/*",
    ]
    actions = ["s3:PutObject"]
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
  }

  statement {
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.lb_logs.bucket}",
    ]
    actions = ["s3:GetBucketAcl"]
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }
  }
}
