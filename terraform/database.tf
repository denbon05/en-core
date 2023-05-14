resource "aws_db_instance" "app_db" {
  allocated_storage     = 10
  max_allocated_storage = 20
  instance_class        = "db.t3.micro"
  db_name               = var.app_db_name
  engine                = var.app_db_engine
  engine_version        = var.app_db_engine_version
  port                  = var.app_db_port
  username              = var.app_db_user
  password              = var.app_db_pass

  vpc_security_group_ids = [aws_security_group.app_db.id]
  db_subnet_group_name   = aws_db_subnet_group.app_db_sg.name

  tags = {
    Name = "en-core-db"
  }
}
