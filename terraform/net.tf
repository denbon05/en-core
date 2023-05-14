locals {
  vpc_cidr_block = "172.16.0.0/18"
  subnet_amount  = var.aws_server_instances_amount
}

# VPC
resource "aws_vpc" "app_vpc" {
  cidr_block = local.vpc_cidr_block

  tags = {
    Name = "app_vpc"
  }
}

# subnets for EC2 instances
resource "aws_subnet" "app_subnet1" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.app_vpc.cidr_block, 2, 1)
  availability_zone = "${var.region}a"

  tags = {
    Name = "app-subnet-1"
  }
}

resource "aws_subnet" "app_subnet2" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.app_vpc.cidr_block, 2, 2)
  availability_zone = "${var.region}b"

  tags = {
    Name = "app-subnet-2"
  }
}

# subnet for db
resource "aws_subnet" "db_subnet" {
  vpc_id     = aws_vpc.app_vpc.id
  cidr_block = cidrsubnet(aws_vpc.app_vpc.cidr_block, 2, 0)
}

# allow internet in VPC
resource "aws_internet_gateway" "app_igw" {
  vpc_id = aws_vpc.app_vpc.id

  tags = {
    Name = "app_igw"
  }
}

# determine where network traffic is directed
resource "aws_route_table" "app_route_table" {
  vpc_id = aws_vpc.app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_igw.id
  }

  tags = {
    Name = "app_route_table"
  }
}

# associate a route table with a subnet within a VPC
resource "aws_route_table_association" "app_rta1" {
  subnet_id      = aws_subnet.app_subnet1.id
  route_table_id = aws_route_table.app_route_table.id
}

resource "aws_route_table_association" "app_rta2" {
  subnet_id      = aws_subnet.app_subnet2.id
  route_table_id = aws_route_table.app_route_table.id
}

# database subnet group allows connection for EC2 instances
resource "aws_db_subnet_group" "app_db_sg" {
  name       = "app-db-subnet-group"
  subnet_ids = [aws_subnet.db_subnet.id, aws_subnet.app_subnet1.id, aws_subnet.app_subnet2.id]

  tags = {
    Name = "en-core-db-subnet-group"
  }
}