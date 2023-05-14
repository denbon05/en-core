output "server_ips" {
  value = [aws_instance.server1.public_ip, aws_instance.server2.public_ip]
}

output "app_lb_public_ip" {
  value = aws_lb.app_lb.dns_name
}

output "app_db_host" {
  value = aws_db_instance.app_db.address
  sensitive = true
}
