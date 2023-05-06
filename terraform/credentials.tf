resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = file("${local.home_dir}/.ssh/id_rsa.pub")
}