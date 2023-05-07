resource "aws_cloudwatch_log_group" "alb_logs" {
  name = "/aws/load-balancer/${aws_lb.app_lb.arn_suffix}/access_logs"

  retention_in_days = 14
}

# todo: aws_cloudwatch_dashboard, aws_cloudwatch_metric_alarm