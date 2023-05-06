resource "aws_instance" "servers" {
  count                       = var.aws_server_instances_amount
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t3.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true
  security_groups = [ aws_security_group.allow_all_traffic.name ]

  tags = {
    Name = "en-core-server-${count.index + 1}"
  }
}