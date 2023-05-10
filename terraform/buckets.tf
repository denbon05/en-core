resource "aws_s3_bucket" "alb_logs" {
  bucket = "en-core-lb-logs"

  tags = {
    Name        = "App LB bucket"
    Environment = "prod"
  }
}
