resource "aws_instance" "server1" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t4g.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.ec2_traffic.id]
  subnet_id                   = aws_subnet.app_subnet1.id

  tags = {
    Name = "en-core-server-1"
  }
}

resource "aws_instance" "server2" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t4g.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.ec2_traffic.id]
  subnet_id                   = aws_subnet.app_subnet1.id

  tags = {
    Name = "en-core-server-2"
  }
}