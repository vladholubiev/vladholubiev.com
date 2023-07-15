import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

/*
Refresh Medium Stats:
1. Open https://medium.com/me/stats
2. Run this in console: `$$('.js-statsTableRow td:nth-child(2) span.sortableTable-value,span.sortableTable-extraNumber').map(el => Number(el.innerText)).reduce((value, memo) => memo + value, 0)`
 */

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Vlad Holubiev</title>
        <meta
          name="description"
          content="I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 284,521 times so far."
        />
      </Head>
      <SimpleLayout
        title="Blog"
        intro="I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 284,521 times so far."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
