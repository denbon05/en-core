resource "aws_security_group" "allow_all_traffic" {
  name        = "allow-tcp"
  description = "Allow ssh connection"

  tags = {
    Name = "Allow SSH"
  }
}

resource "aws_security_group_rule" "allow_ssh" {
  type              = "ingress"
  description       = "SSH"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_all_traffic.id
}

resource "aws_security_group_rule" "allow_all_traffic_outbound" {
  type = "egress"
  description = "Allow externall traffic"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_all_traffic.id
}