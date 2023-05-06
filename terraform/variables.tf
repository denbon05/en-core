locals {
  home_dir = pathexpand("~")
}

variable "aws_server_instances_amount" {
  type    = number
  default = 2
}

variable "aws_access_key" {
  type      = string
  sensitive = true
}

variable "aws_secret_key" {
  type      = string
  sensitive = true
}

variable "aws_region" {
  type = string
}

variable "aws_cidr_range" {
  type    = string
  default = "172.16.10.0/24"
}
