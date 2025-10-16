import Head from 'next/head';
import Link from 'next/link';
import {ComponentType} from 'react';
import {GetStaticProps, NextPage} from 'next';
import {Container} from '@/components/Container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  StackOverflowIcon,
  XIcon,
} from '@/components/icons/SocialIcons';

import {getAllArticles} from '@/lib/getAllArticles';
import {Resume} from '@/components/Resume';
import {GITHUB, INSTAGRAM, LINKEDIN, MEDIUM, STACKOVERFLOW, X} from '@/lib/social-links';
import {SplitText} from '@/components/SplitText';
import {ArticleListItem} from '@/components/ArticleListItem';

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  mediumUrl?: string;
}

interface ArticleProps {
  article: ArticleMeta;
}

interface SocialLinkProps {
  icon: ComponentType<{className?: string}>;
  href: string;
  'aria-label': string;
  title?: string;
}

interface HomeProps {
  articles: ArticleMeta[];
  articleCount: number;
}

function Article({article}: ArticleProps) {
  return (
    <ArticleListItem
      href={`/articles/${article.slug}`}
      title={article.title}
      description={article.description}
      date={article.date}
      readingTime={article.readingTime}
    />
  );
}

function SocialLink({icon: Icon, ...props}: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props} title={props['aria-label']}>
      <Icon className="h-5 w-5 fill-zinc-500 transition duration-150 ease-out group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-200" />
    </Link>
  );
}

const DESCRIPTION = `The home page of Vlad Holubiev, a Senior Director of Technology at Shelf and an Open Source contributor from Ukraine.`;

const Home: NextPage<HomeProps> = ({articles, articleCount}) => {
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

        <meta property="og:title" content="Vladyslav Holubiev: Home Page" />
        <meta property="og:url" content="https://vladholubiev.com/" />
        <meta name="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://vladholubiev.com/avatar.jpg" />
        <meta property="og:site_name" content="Vladyslav Holubiev" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@vladholubiev" />
        <meta name="twitter:creator" content="@vladholubiev" />
        <meta name="twitter:title" content="Vladyslav Holubiev: Home Page" />
        <meta name="twitter:url" content="https:/vladholubiev.com/" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://vladholubiev.com/avatar.jpg" />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <SplitText className="text-4xl font-bold tracking-[-0.02em] text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Vladyslav Holubiev
          </SplitText>
          <SplitText className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Technology leader delivering AI products and engineering excellence
          </SplitText>
          <div className="mt-6 flex gap-6">
            <SocialLink href={X} aria-label="Follow me on X (formerly Twitter)" icon={XIcon} />
            <SocialLink href={LINKEDIN} aria-label="Follow me on LinkedIn" icon={LinkedInIcon} />
            <SocialLink href={MEDIUM} aria-label="Follow me on Medium" icon={MediumIcon} />
            <SocialLink href={GITHUB} aria-label="Follow me on GitHub" icon={GitHubIcon} />
            <SocialLink href={INSTAGRAM} aria-label="Follow me on Instagram" icon={InstagramIcon} />
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
          <div className="flex flex-col divide-y divide-zinc-900/5 border-t border-zinc-900/5 dark:divide-white/10 dark:border-white/10">
            {articles.slice(0, 3).map(article => (
              <Article key={article.slug} article={article} />
            ))}
            <div className="pt-6 md:grid md:grid-cols-[6rem_minmax(0,1fr)_auto] md:gap-x-6">
              <Link
                href="/articles"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900/20 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-white sm:w-auto md:col-start-2 md:justify-self-start"
              >
                Browse all {articleCount} articles
              </Link>
            </div>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allArticles = await getAllArticles();
  return {
    props: {
      articles: allArticles.slice(0, 4).map(({component: _component, ...meta}) => meta),
      articleCount: allArticles.length,
    },
  };
};
