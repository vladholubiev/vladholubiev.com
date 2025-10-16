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
            <article>
              <header className="flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl lg:text-6xl dark:text-zinc-100">
                  {meta.title}
                </h1>
                <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                  {meta.description}
                </p>

                {/* Meta row with Medium link, read time, and date */}
                <div className="mt-8 flex flex-col gap-6 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700/40">
                  {meta.mediumUrl ? (
                    <a
                      href={meta.mediumUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 self-start rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 sm:self-center dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <MediumIcon className="h-5 w-5 fill-current" aria-hidden="true" />
                      <span>Read on Medium</span>
                    </a>
                  ) : null}

                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                    <div className="flex flex-col">
                      <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                        Read Time
                      </p>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                        {meta.readingTime}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                        Posted on
                      </p>
                      <time
                        dateTime={meta.date}
                        className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
                      >
                        {formatDate(meta.date)}
                      </time>
                    </div>
                  </div>
                </div>
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
