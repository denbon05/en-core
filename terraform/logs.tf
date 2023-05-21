resource "aws_cloudwatch_log_group" "lb_logs_log_group" {
  name              = "lb-logs-${aws_lb.app_lb.arn_suffix}"
  retention_in_days = 7

  tags = {
    Environment = "production"
    Application = "en-core-lb"
  }
}

resource "aws_cloudwatch_log_stream" "lb_logs_log_stream" {
  name           = "lb-logs-stream"
  log_group_name = aws_cloudwatch_log_group.lb_logs_log_group.name
}

resource "aws_cloudwatch_log_metric_filter" "elastic_metric_filter" {
  name           = "Elastic-metric-filter"
  pattern        = "ERROR"
  log_group_name = aws_cloudwatch_log_group.lb_logs_log_group.name

  metric_transformation {
    name      = "ErrorCount"
    namespace = "en-core"
    value     = "1"
  }
}

# todo: autoscaling, aws_cloudwatch_dashboard