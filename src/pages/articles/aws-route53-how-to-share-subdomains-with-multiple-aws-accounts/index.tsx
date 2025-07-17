import {ArticleLayout} from '@/components/ArticleLayout';
import {Heading} from '@/components/Heading';
import Image from 'next/image';
import image01 from './image-01.webp';
import image02 from './image-02.webp';
import image03 from './image-03.webp';
import image04 from './image-04.webp';
import image05 from './image-05.webp';
import image06 from './image-06.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2022-08-12',
  title: 'AWS Route53: How to Share Subdomains with Multiple AWS Accounts',
  description: 'Learn how to deploy beta.api.example.com from a different AWS account that doesn&apos;t own the example.com domain.',
  readingTime: '6 min read',
}

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <Image src={image01} alt="" className="no-rounding"/>
      
      <p>At my current company, we started development from a single AWS account.
      As the product grew in size, we faced a need to provision multiple AWS accounts to share the infrastructure across them.</p>
      
      <p>A non-trivial problem we faced, is how to deploy resources in different AWS accounts,
      and let them inherit the same domain, that is managed in the original AWS account.
      Each AWS Account is strongly segregated from the others, the resources in each account cannot be accessed by other accounts.</p>
      
      <Heading level={2}>Situation</Heading>
      
      <p>Imagine you have a single AWS Account where you have your domain <code>example.com</code>.
      AWS Route53 hosted zone is created for that domain in AWS Account #1.
      You have a Cloudfront distribution pointing to <code>example.com</code> that hosts your website.</p>
      
      <p>Now it&apos;s time to create an API.
      You want to create a separate AWS Account for a team that works on the API.
      API should live under the same domain, at <code>api.example.com</code>.
      Maybe you&apos;ll even have multiple stages, like <code>beta.api.example.com</code> or <code>alpha.api.example.com</code>.</p>
      
      <p>But if you create a Route53 hosted zone for <code>api.example.com</code> in the 2nd AWS account,
      you&apos;ll see that requests don&apos;t end up in the 2nd AWS account.</p>
      
      <p>They are getting resolved by the R53 hosted zone from the first account.
      This is good because if anybody could create a hosted zone for any domain they wish,
      they could redirect any DNS query to anywhere they want, which would be a huge security problem.</p>
      
      <p>So we need a way to let the DNS know that there are DNS records for <code>api.example.com</code> created somewhere else and they should be trusted.</p>
      
      <Heading level={2}>First, A Non-Elegant Solution</Heading>
      
      <Image src={image02} alt="" className="no-rounding"/>
      
      <p>The first solution that came to mind, is to have a load balancer deployed in Account #1
      that will proxy the requests to the API Gateway deployed in a different account.</p>
      
      <p>This solution is fine for a one-time setup, or if you know the number of domains won&apos;t grow in the future.
      Otherwise, it has drawbacks:</p>
      
      <ol>
        <li>Account #1 needs to know about each deployed API in Account #2. It becomes a sort of God Class.</li>
        <li>Account #1 now needs to store all the TLS certificates for all the subdomains in a single place.
        Since AWS ACM supports only one-level deep wildcards, you&apos;ll need to create a new certificate for each two-level subdomain.</li>
        <li>If something happens to the load balancer on Account #1 — all other accounts are impacted.
        It becomes a single point of failure.</li>
        <li>Whenever a team that works in Account #2 wants to change the mapping, they need to contact the team that manages Account #1 to make the changes.</li>
      </ol>
      
      <Heading level={2}>A Better Approach</Heading>
      
      <Image src={image03} alt="" className="no-rounding"/>
      
      <p>A better approach would be to &quot;link&quot; two Route53 hosted zones via a Name Servers DNS record.
      Let me explain.</p>
      
      <p><strong>Step #1: Create a Route53 hosted zone in AWS Account #2</strong></p>
      
      <p>In our case, we want to create a hosted zone for the <code>api.example.com</code> domain.</p>
      
      <Image src={image04} alt="" className="no-rounding"/>
      
      <p>Whenever you create a new Route53 hosted zone, it creates an NS (name servers) DNS record inside automatically.
      It&apos;s a record with 4 values inside, for example:</p>
      
      <Image src={image05} alt="" className="no-rounding"/>
      
      <p><strong>Step #2: Create an NS record in the &quot;parent&quot; domain</strong></p>
      
      <p>Now we need to let DNS know, that all the DNS queries to the <code>api.example.com</code> or <code>*.api.example.com</code>
      records should be handled by a different AWS Route53 hosted zone.</p>
      
      <p>The way to do it is to create an identical DNS NS record in the &quot;parent&quot; hosted zone,
      the one in AWS Account #1 which owns the <code>example.com</code> domain.</p>
      
      <Image src={image06} alt="" className="no-rounding"/>
      
      <p><strong>Step #3: Provision infrastructure in AWS Account #2 assuming full ownership of all the DNS records</strong></p>
      
      <p>That&apos;s all!
      Now you can create DNS records in the 2nd AWS Account under <code>*.api.example.com</code> assuming you have full control over it!</p>
      
      <ul>
        <li>Request an ACM certificate for TLS for your API Gateway.</li>
        <li>Create Alias DNS records from <code>beta.api.example.com</code> that points to your API Gateway.</li>
      </ul>
      
      <Heading level={2}>Final Words</Heading>
      
      <p>The approach described allows you to share a common top-level domain across multiple AWS Accounts with loose coupling.
      AWS Accounts have full access to a hosted zone for a subdomain that was shared with them through a parent account.</p>
      
      <p>Beware, that there is <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html#limits-api-entities-records">a soft limit of 10,000 records</a>{' '}
      per hosted zone. But it&apos;s a soft limit, that can be raised through a support ticket to AWS.</p>
      
      <p>As stated in the <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-routing-traffic-for-subdomains.html">AWS documentation</a>:</p>
      
      <blockquote>
        <p>There&apos;s a small performance impact to this configuration for the first DNS query from each DNS resolver.
        The resolver must get information from the hosted zone for the root domain and then get information from the hosted zone for the subdomain.</p>
      </blockquote>
    </ArticleLayout>
  )
}