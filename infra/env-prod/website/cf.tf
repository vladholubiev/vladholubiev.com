resource "aws_cloudfront_origin_access_identity" "prod" {
  comment = "${var.domain}"

  lifecycle {
    prevent_destroy       = true
    create_before_destroy = true
  }
}

resource "aws_cloudfront_distribution" "prod" {
  origin {
    domain_name = "${aws_s3_bucket.vladholubiev_com.website_endpoint}"
    origin_id   = "${aws_s3_bucket.vladholubiev_com.bucket_domain_name}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_keepalive_timeout = 5
      origin_read_timeout      = 30
      origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.domain}"
  default_root_object = "index.html"

  aliases = [
    "${var.domain}",
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "S3-Website-${aws_s3_bucket.vladholubiev_com.bucket_domain_name}"

    forwarded_values {
      query_string = false

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
