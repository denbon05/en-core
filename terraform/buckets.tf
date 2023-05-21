# S3 bucket for ALB access logs
resource "aws_s3_bucket" "lb_logs" {
  bucket = "en-core-lb-logs"

  tags = {
    Name        = "App LB bucket"
    Environment = "production"
  }
}

# S3 bucket policy to allow ALB access logging
resource "aws_s3_bucket_policy" "alb_logs_bucket_policy" {
  bucket = aws_s3_bucket.lb_logs.id
  policy = data.aws_iam_policy_document.allow_lb.json
}
