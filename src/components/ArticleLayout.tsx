import {ReactNode} from 'react';

import {ArticleBackButton} from '@/components/ArticleBackButton';
import {Container} from '@/components/Container';
import {Prose} from '@/components/Prose';
import {formatDate} from '@/lib/formatDate';
import {MediumIcon} from '@/components/icons/SocialIcons';

interface ArticleMeta {
  title: string;
  description: string;
  author?: string;
  date: string;
  readingTime: string;
  mediumUrl?: string;
}

interface ArticleLayoutProps {
  children: ReactNode;
  meta: ArticleMeta;
}

export function ArticleLayout({children, meta}: ArticleLayoutProps) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <ArticleBackButton />
          <article className="article">
            <header className="flex flex-col">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.01em] text-zinc-900 leading-[1.2] sm:text-5xl lg:text-6xl dark:text-zinc-50">
                {meta.title}
              </h1>
              {meta.description ? (
                <p className="dek mt-4 text-balance text-lg font-normal text-zinc-700 dark:text-zinc-300">
                  {meta.description}
                </p>
              ) : null}

              <p className="meta mt-4 font-medium text-[0.90625rem] text-zinc-500 dark:text-zinc-400">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span aria-hidden="true"> • </span>
                <span className="tabular-nums">{meta.readingTime}</span>
              </p>

              {meta.mediumUrl ? (
                <a
                  href={meta.mediumUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <MediumIcon className="h-5 w-5 fill-current" aria-hidden="true" />
                  <span>Read on Medium</span>
                </a>
              ) : null}
            </header>
            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  );
}
