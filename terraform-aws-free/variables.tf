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
