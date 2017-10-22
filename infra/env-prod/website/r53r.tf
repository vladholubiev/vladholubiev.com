resource "aws_route53_record" "vladholubiev_com_NS" {
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

resource "aws_route53_record" "vladholubiev_com_SOA" {
  zone_id = "${aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "${var.domain}"
  type    = "SOA"
  ttl     = "900"

  records = [
    "ns-545.awsdns-04.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400",
  ]
}

resource "aws_route53_record" "vladholubiev_com_A" {
  zone_id = "${aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "${var.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.prod.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.prod.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_vladholubiev_com_A" {
  zone_id = "${aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "www.${var.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.prod.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.prod.hosted_zone_id}"
    evaluate_target_health = false
  }
}
