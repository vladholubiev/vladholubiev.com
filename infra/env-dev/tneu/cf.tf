resource "aws_cloudfront_origin_access_identity" "tneu_scores" {
  comment = "${var.subdomain}.${var.domain}"

  lifecycle {
    prevent_destroy       = true
    create_before_destroy = true
  }
}

resource "aws_cloudfront_distribution" "tneu_scores" {
  origin {
    domain_name = "${aws_route53_record.tneu_droplet.name}"
    origin_id   = "Custom-${aws_route53_record.tneu_droplet.name}"

    custom_origin_config {
      http_port                = "${var.droplet_port}"
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_keepalive_timeout = 5
      origin_read_timeout      = 10
      origin_ssl_protocols     = ["SSLv3"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.subdomain}.${var.domain}"
  default_root_object = "index.html"

  aliases = [
    "${var.subdomain}.${var.domain}",
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
      "POST",
      "DELETE",
      "PUT",
      "PATCH",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "Custom-${aws_route53_record.tneu_droplet.name}"

    forwarded_values {
      query_string = true

      query_string_cache_keys = [
        "none",
      ]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 10
    max_ttl                = 300
    compress               = true
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags {
    Environment = "${var.env}"
    Terraform   = true
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = "${data.aws_acm_certificate.prod.arn}"
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1"
  }

  lifecycle {
    prevent_destroy       = true
    create_before_destroy = true
  }
}

data "aws_acm_certificate" "prod" {
  domain = "*.${var.domain}"
}