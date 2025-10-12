import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { ComponentType, ReactNode } from "react";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  StackOverflowIcon,
  XIcon
} from "@/components/icons/SocialIcons";

import { formatDate } from "@/lib/formatDate";
import { getAllArticles } from "@/lib/getAllArticles";
import { Resume } from "@/components/Resume";
import { GITHUB, INSTAGRAM, LINKEDIN, MEDIUM, STACKOVERFLOW, X } from "@/lib/social-links";
import { Button } from "@/components/Button";
import { SplitText } from "@/components/SplitText";

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  component?: ComponentType;
}

interface ArticleProps {
  article: ArticleMeta;
}

interface SocialLinkProps {
  icon: ComponentType<{ className?: string }>;
  href: string;
  "aria-label": string;
  title?: string;
}

interface HomeProps {
  articles: ArticleMeta[];
}

function Article({ article }: ArticleProps) {
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
  );
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props} title={props["aria-label"]}>
      <Icon
        className="h-6 w-6 fill-ua-blue-500 transition group-hover:fill-ua-blue-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
    </Link>
  );
}

const DESCRIPTION = `The home page of Vlad Holubiev, a Senior Director of Technology at Shelf and an Open Source contributor from Ukraine.`;

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>
          Vladyslav Holubiev - Technology leader delivering AI products and engineering excellence
        </title>
        <meta
          name="description"
          content="Vladyslav Holubiev - Technology leader delivering AI products and engineering excellence"
        />

        <meta property="og:title" content="Vladyslav Holubiev: Home Page"/>
        <meta property="og:url" content="https://vladholubiev.com/"/>
        <meta name="og:description" content={DESCRIPTION}/>
        <meta property="og:image" content="https://vladholubiev.com/avatar.jpg"/>
        <meta property="og:site_name" content="Vladyslav Holubiev"/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@vladholubiev"/>
        <meta name="twitter:creator" content="@vladholubiev"/>
        <meta name="twitter:title" content="Vladyslav Holubiev: Home Page"/>
        <meta name="twitter:url" content="https:/vladholubiev.com/"/>
        <meta name="twitter:description" content={DESCRIPTION}/>
        <meta name="twitter:image" content="https://vladholubiev.com/avatar.jpg"/>

      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <SplitText className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Vladyslav Holubiev
          </SplitText>
          <SplitText className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Technology leader delivering AI products and engineering excellence
          </SplitText>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={X}
              aria-label="Follow me on X (formerly Twitter)"
              icon={XIcon}
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
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.slice(0, 3).map((article) => (
              <Article key={article.slug} article={article}/>
            ))}
            <Button href="/articles" variant="secondary" className="w-full lg:w-1/2">
              Read more
            </Button>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume/>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta)
    }
  };
};
