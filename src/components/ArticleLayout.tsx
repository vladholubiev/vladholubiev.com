import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, SVGProps } from 'react'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import avatarImage from '@/images/avatar.jpg'

interface ArticleMeta {
  title: string
  description: string
  author: string
  date: string
  readingTime: string
}

interface ArticleLayoutProps {
  children: ReactNode
  meta: ArticleMeta
  previousPathname?: string
}


export function ArticleLayout({
  children,
  meta,
  previousPathname,
}: ArticleLayoutProps) {
  let router = useRouter()

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
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
                  {meta.title}
                </h1>
                <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
                  {meta.description}
                </p>
                
                {/* Author + Read Time + Date Row */}
                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                  {/* Author Section */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <Image
                        src={avatarImage}
                        alt=""
                        className="h-11 w-11 rounded-full object-cover grayscale"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                        Written by
                      </p>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                        {meta.author}
                      </p>
                    </div>
                  </div>

                  {/* Read Time Section */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                      Read Time
                    </p>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                      {meta.readingTime}
                    </p>
                  </div>

                  {/* Date Section */}
                  <div className="flex flex-col items-end">
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
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}