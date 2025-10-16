import Head from 'next/head';
import {useRouter} from 'next/router';
import {ReactNode} from 'react';

import {Container} from '@/components/Container';
import {Prose} from '@/components/Prose';
import {formatDate} from '@/lib/formatDate';
import {ArrowLeftIcon} from '@/components/icons/ArrowLeftIcon';
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
  previousPathname?: string;
}

export function ArticleLayout({children, meta, previousPathname}: ArticleLayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${meta.title} - Vlad Holubiev`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
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
    </>
  );
}
