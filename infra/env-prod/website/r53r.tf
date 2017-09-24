resource "aws_route53_record" "vladholubiev_com" {
  zone_id = "${aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "${var.domain}"
  type    = "NS"
  ttl     = "172800"

  records = [
    "ns-545.awsdns-04.net.",
    "ns-1869.awsdns-41.co.uk.",
    "ns-1039.awsdns-01.org.",
    "ns-362.awsdns-45.com.",
  ]
}
