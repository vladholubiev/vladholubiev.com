resource "aws_route53_zone" "vladholubiev_com" {
  name    = "${var.domain}."
  comment = ""

  tags {
    Terraform = true
  }

  lifecycle {
    prevent_destroy       = true
    create_before_destroy = true
  }
}
