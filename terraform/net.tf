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

# subnet for each EC2 instance
resource "aws_subnet" "app_subnets" {
  count      = local.subnet_amount
  vpc_id     = aws_vpc.app_vpc.id
  cidr_block = cidrsubnet(aws_vpc.app_vpc.cidr_block, 2, count.index)

  tags = {
    Name = "app-subnet-${count.index + 1}"
  }
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
resource "aws_route_table_association" "app_rta" {
  count          = length(aws_subnet.app_subnets)
  subnet_id      = aws_subnet.app_subnets[count.index].id
  route_table_id = aws_route_table.app_route_table.id
}