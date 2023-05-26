resource "aws_instance" "server1" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true
  security_groups = [ aws_security_group.ec2_traffic.id ]
  subnet_id                   = aws_subnet.app_subnet1.id

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "en-core-server-1"
  }
}
