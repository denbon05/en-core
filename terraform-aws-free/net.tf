# VPC
resource "aws_vpc" "app_vpc" {
  cidr_block = "172.16.0.0/18"

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
