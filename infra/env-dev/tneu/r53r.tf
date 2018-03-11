resource "aws_route53_record" "tneu_droplet" {
  zone_id = "${data.aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "tneu-droplet.${var.domain}"
  type    = "A"
  ttl     = "60"

  records = [
    "${var.droplet_ip}",
  ]
}

resource "aws_route53_record" "tneu_scores" {
  zone_id = "${data.aws_route53_zone.vladholubiev_com.zone_id}"
  name    = "${var.subdomain}.${var.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.tneu_scores.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.tneu_scores.hosted_zone_id}"
    evaluate_target_health = false
  }
}

data "aws_route53_zone" "vladholubiev_com" {
  name = "${var.domain}."
}
