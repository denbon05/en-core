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
resource "aws_security_group" "ec2_traffic" {
  name        = "ec2-traffic"
  description = "Allow ssh connection"
  vpc_id      = aws_vpc.app_vpc.id

  tags = {
    Name = "Allow SSH"
  }
}

# DB
resource "aws_security_group" "app_db" {
  name   = "allow-db-connection"
  vpc_id = aws_vpc.app_vpc.id

  tags = {
    Name = "Allow db connection"
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
  security_group_id = aws_security_group.ec2_traffic.id
}

resource "aws_security_group_rule" "allow_all_inbound" {
  type              = "ingress"
  description       = "All inbound - remove"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ec2_traffic.id
}

resource "aws_security_group_rule" "allow_all_traffic_outbound" {
  type              = "egress"
  description       = "Allow externall traffic"
  from_port         = var.app_port
  to_port           = var.app_port
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ec2_traffic.id
}

resource "aws_security_group_rule" "allow_lb_ec2_connection" {
  type                     = "ingress"
  description              = "Allow LB access to EC2 instances"
  from_port                = var.app_port
  to_port                  = var.app_port
  protocol                 = "-1" // todo tcp
  security_group_id        = aws_security_group.ec2_traffic.id
  source_security_group_id = aws_security_group.lb_sg.id
}

resource "aws_security_group_rule" "allow_egress_traffic" {
  type              = "egress"
  description       = "Allow all outgoing traffic"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lb_sg.id
}

resource "aws_security_group_rule" "allow_lb_inbound_port" {
  type              = "ingress"
  description       = "Allow entry point"
  from_port         = 80
  to_port           = 80
  protocol          = "-1" // todo tcp
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lb_sg.id
}

resource "aws_security_group_rule" "allow_db" {
  type              = "ingress"
  from_port         = var.app_db_port
  to_port           = var.app_db_port
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.app_db.id
}
