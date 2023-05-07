data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_availability_zones" "app_available_zones" {
  state                  = "available"
  all_availability_zones = true

  # filter {
  #   name   = "opt-in-status"
  #   values = ["not-opted-in", "opted-in"] # only available zones
  # }

  filter {
    name   = "region-name"
    values = [var.region, "eu-west-2"]
  }
}