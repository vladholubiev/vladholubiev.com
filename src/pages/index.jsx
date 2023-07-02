import Head from 'next/head'
import Link from 'next/link'
import {Card} from '@/components/Card'
import {Container} from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon, StackOverflowIcon,
  TwitterIcon,
} from '@/components/icons/SocialIcons'

import {formatDate} from '@/lib/formatDate'
import {getAllArticles} from '@/lib/getAllArticles'
import {Resume} from '@/components/Resume';
import {GITHUB, INSTAGRAM, LINKEDIN, MEDIUM, STACKOVERFLOW, TWITTER} from '@/lib/social-links';


function Article({article}) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({icon: Icon, ...props}) {
  return (
    <Link className="group -m-1 p-1" {...props} title={props['aria-label']}>
      <Icon
        className="h-6 w-6 fill-ua-blue-500 transition group-hover:fill-ua-blue-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
    </Link>
  )
}


export default function Home({articles}) {
  return (
    <>
      <Head>
        <title>
          Vlad Holubiev - Software Engineer
        </title>
        <meta
          name="description"
          content="I’m Vlad Holubiev, a software designer from Ukraine 🇺🇦"
        />

        <meta property="og:title" content="Vlad Holubiev: Home Page" />
        <meta property="og:url" content="https://vladholubiev.com/" />
        <meta name="og:description" content="The home page of Vlad Holubiev, a Senior Director of Technology at Shelf and an Open Source contributor from Ukraine." />
        <meta property="og:image" content="https://vladholubiev.com/avatar.jpg" />
        <meta property="og:site_name" content="Vlad Holubiev" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@vladholubiev" />
        <meta name="twitter:creator" content="@vladholubiev" />
        <meta name="twitter:title" content="Vlad Holubiev: Home Page" />
        <meta name="twitter:url" content="https:/vladholubiev.com/" />
        <meta name="twitter:description" content="The home page of Vlad Holubiev, a Senior Director of Technology at Shelf and an Open Source contributor from Ukraine." />
        <meta name="twitter:image" content="https://vladholubiev.com/avatar.jpg" />

      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Vlad Holubiev
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Hello, I’m a software engineer from Ukraine 🇺🇦
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={TWITTER}
              aria-label="Follow me on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href={LINKEDIN}
              aria-label="Follow me on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href={MEDIUM}
              aria-label="Follow me on Medium"
              icon={MediumIcon}
            />
            <SocialLink
              href={GITHUB}
              aria-label="Follow me on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={INSTAGRAM}
              aria-label="Follow me on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href={STACKOVERFLOW}
              aria-label="See me on StackOverflow"
              icon={StackOverflowIcon}
            />
          </div>
        </div>
      </Container>
      {/*<Photos/>*/}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article}/>
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/*<Newsletter/>*/}
            <Resume/>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({component, ...meta}) => meta),
    },
  }
}
