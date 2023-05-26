resource "aws_lb" "app_lb" {
  name               = "app-lb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.lb_sg.id]
  subnets         = [aws_subnet.app_subnet1.id, aws_subnet.app_subnet2.id]

  # lifecycle {
  #   prevent_destroy = true
  # }

  access_logs {
    bucket  = aws_s3_bucket.lb_logs.id
    enabled = true
  }

  tags = {
    Environment = "production"
  }
}

# responsible for checking incoming requests to the LB
# and routing them to the appropriate target
resource "aws_lb_listener" "lb_listener" {
  # Amazon Resource Name
  load_balancer_arn = aws_lb.app_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

# help to route traffic to multiple instances
# better control over traffic routing
# health checks
# allows integration with other AWS services
resource "aws_lb_target_group" "target_group" {
  name_prefix = "web-tg"

  vpc_id      = aws_vpc.app_vpc.id
  port        = var.app_port
  protocol    = "HTTP"
  target_type = "instance"

  health_check {
    path     = "/"
    protocol = "HTTP"
  }
}

# allows register one or more targets to a target group
# automatically register new instances with the LB as they are launched,
# and deregister instances that are terminated
resource "aws_lb_target_group_attachment" "lb_tg_attachment" {
  count            = var.aws_server_instances_amount
  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = [aws_instance.server1.id, aws_instance.server2.id][count.index]
  port             = var.app_port
}
