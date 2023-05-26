# Groups
# Servers
resource "aws_security_group" "ec2_traffic" {
  name        = "ec2-traffic"
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
  security_group_id = aws_security_group.ec2_traffic.id
}

resource "aws_security_group_rule" "allow_http_inbound" {
  type              = "ingress"
  description       = "Http"
  from_port         = 80
  to_port           = 80
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ec2_traffic.id
}

resource "aws_security_group_rule" "allow_all_traffic_outbound" {
  type              = "egress"
  description       = "Allow externall traffic"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ec2_traffic.id
}
