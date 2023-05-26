output "server_ips" {
  value = [aws_instance.server1.public_ip]
}
