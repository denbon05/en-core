# Groups
# LB
resource "aws_security_group" "lb_sg" {
  name_prefix = "lb-sg"
  description = "Load balancer"
  vpc_id      = aws_vpc.app_vpc.id

  tags = {
    Name = "LB"
  }
}

# Servers
resource "aws_security_group" "allow_traffic" {
  name        = "allow-tcp"
  description = "Allow ssh connection"
  vpc_id = aws_vpc.app_vpc.id

  tags = {
    Name = "Allow SSH"
  }
}

# Rules
resource "aws_security_group_rule" "allow_ssh_inbound" {
  type              = "ingress"
  description       = "SSH"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_traffic.id
}

resource "aws_security_group_rule" "allow_all_traffic_outbound" {
  type              = "egress"
  description       = "Allow externall traffic"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_traffic.id
}

resource "aws_security_group_rule" "allow_lb" {
  type                     = "ingress"
  description              = "Allow LB access"
  from_port                = 80
  to_port                  = var.app_port
  protocol                 = "-1" # todo tcp
  security_group_id        = aws_security_group.allow_traffic.id
  source_security_group_id = aws_security_group.lb_sg.id
}

resource "aws_security_group_rule" "allow_inbound_port" {
  type              = "ingress"
  description       = "Allow entry point"
  from_port         = 80
  to_port           = var.app_port
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lb_sg.id
}
