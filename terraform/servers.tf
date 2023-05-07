resource "aws_instance" "servers" {
  count                       = var.aws_server_instances_amount
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.allow_traffic.id]
  subnet_id                   = aws_subnet.app_subnets[count.index].id

  tags = {
    Name = "en-core-server-${count.index + 1}"
  }
}