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

variable "app_port" {
  type      = number
  sensitive = true
}

variable "region" {
  default = "eu-central-1"
}

variable "app_db_name" {
  type      = string
  sensitive = true
}

variable "app_db_engine" {
  type      = string
  sensitive = true
}

variable "app_db_engine_version" {
  type      = string
  sensitive = true
}

variable "app_db_port" {
  type      = number
  sensitive = true
}

variable "app_db_user" {
  type      = string
  sensitive = true
}

variable "app_db_pass" {
  type      = string
  sensitive = true
}
