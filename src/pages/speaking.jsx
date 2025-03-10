import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import {formatDate} from '@/lib/formatDate';

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, date, cta,event, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow>{event} – {formatDate(date)}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      {cta && <Card.Cta>{cta}</Card.Cta>}
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <Head>
        <title>Speaking - Vlad Holubiev</title>
        <meta
          name="description"
          content="Meetups where I speak."
        />
      </Head>
      <SimpleLayout
        title="Speaking"
        intro="I was fortunate to be invited to speak at some meetups to share my experience."
      >
        <div className="space-y-20">
          <SpeakingSection title="Meetups">
            <Appearance
              date="2025-03-06"
              title="Getting the Most out of AI: Secrets of Expert-Level Usage"
              description="Shared insights on avoiding common AI pitfalls, selecting suitable models, managing knowledge context, and practical AI application strategies."
              event="Cashflow Club Wrocław"
            />
            <Appearance
              date="2024-11-17"
              title="Cybersecurity: Seriously Speaking"
              description="Discussed common cybersecurity concerns, online/offline threats, phishing schemes, hacker methods, typical user mistakes, and practical steps to enhance personal digital security."
              event="Toastmasters"
            />
            <Appearance
              date="2023-01-26"
              title="1 Million Parallel Lambdas vs Unfriendly Websites"
              description="A story of using AWS Lambda for load-testing purposes on a tight budget. From Serverless intro to hard-core Lambda optimizations for maximum concurrency."
              event="meet.js Wrocław"
              href="https://github.com/vladholubiev/concurrency-checker"
              cta="Github Repo"
            />
            <Appearance
              date="2018-06-26"
              title="AWS AppSync (GraphQL on AWS)"
              description="I shared my experience of running GraphQL APIs in production on AWS. Since then I am lukewarm about GraphQL and AppSync but it was a hot topic back then."
              event="GDG Lviv Meetup"
              href="https://github.com/vladholubiev/gdg-lviv-graphql-appsync-demo"
              cta="Github Repo"
            />
            <Appearance
              date="2016-06-30"
              title="Taming Meteor deployment with Wercker"
              description="I shared my experience of setting up a CI to deploy Meteor.js apps in Docker containers to AWS. Back in the days, people kept deploying Meteor apps manually or to plain EC2 and AWS ECS was a new kid on the block."
              event="Meteor Ukraine"
            />
            <Appearance
              date="2016-03-16"
              title="A Visual Introduction to Machine Learning"
              description="My first talk ever, where I explain the basics of machine learning, with examples of supervised and unsupervised learning. Then I shared tools I used and real-life problems solved."
              event="GDG Ternopil Meetup"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
