import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArticleListItem } from '@/components/ArticleListItem';
import { Container } from '@/components/Container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  StackOverflowIcon,
  XIcon,
} from '@/components/icons/SocialIcons';
import { Resume } from '@/components/Resume';
import { SplitText } from '@/components/SplitText';
import { getAllArticles } from '@/lib/getAllArticles';
import {
  GITHUB,
  INSTAGRAM,
  LINKEDIN,
  MEDIUM,
  STACKOVERFLOW,
  X,
} from '@/lib/social-links';

const DESCRIPTION =
  'The home page of Vlad Holubiev, a Senior Director of Technology at Shelf and an Open Source contributor from Ukraine.';

export const metadata: Metadata = {
  title:
    'Vladyslav Holubiev - Technology leader delivering AI products and engineering excellence',
  description:
    'Vladyslav Holubiev - Technology leader delivering AI products and engineering excellence',
  openGraph: {
    title: 'Vladyslav Holubiev: Home Page',
    description: DESCRIPTION,
    url: 'https://vladholubiev.com/',
    images: ['https://vladholubiev.com/avatar.jpg'],
    siteName: 'Vladyslav Holubiev',
  },
  twitter: {
    card: 'summary',
    site: '@vladholubiev',
    creator: '@vladholubiev',
    title: 'Vladyslav Holubiev: Home Page',
    description: DESCRIPTION,
    images: ['https://vladholubiev.com/avatar.jpg'],
  },
};

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  mediumUrl?: string;
}

interface SocialLinkProps {
  icon: ComponentType<{ className?: string }>;
  href: string;
  'aria-label': string;
  title?: string;
}

function Article({ article }: { article: ArticleMeta }) {
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

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props} title={props['aria-label']}>
      <Icon className="h-5 w-5 text-zinc-500 transition duration-150 ease-out group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
    </Link>
  );
}

export default async function Page() {
  const allArticles = await getAllArticles();
  const articles = allArticles.slice(0, 4).map(({ component, ...meta }) => {
    void component;
    return meta;
  });

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <SplitText className="text-4xl font-bold tracking-[-0.02em] text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Vladyslav Holubiev
          </SplitText>
          <SplitText className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
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
          <div className="flex flex-col divide-y divide-zinc-900/5 border-t border-zinc-900/5 dark:divide-white/10 dark:border-white/10">
            {articles.slice(0, 3).map((article) => (
              <Article key={article.slug} article={article} />
            ))}
            <div className="pt-6 md:grid md:grid-cols-[6rem_minmax(0,1fr)_auto] md:gap-x-6">
              <Link
                href="/articles"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900/20 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:border-white/20 dark:hover:text-white sm:w-auto md:col-start-3 md:justify-self-end"
              >
                <BookOpen className="h-4 w-4" strokeWidth={1.5} />
                Browse all {allArticles.length} articles
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
}
