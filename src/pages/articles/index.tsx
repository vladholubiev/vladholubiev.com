import Head from 'next/head';
import {GetStaticProps, NextPage} from 'next';

import {SimpleLayout} from '@/components/SimpleLayout';
import {getAllArticles} from '@/lib/getAllArticles';
import {ArticleListItem} from '@/components/ArticleListItem';
import type {Article} from '@/types/article';

interface ArticleProps {
  article: Article;
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

/*
Refresh Medium Stats:
Open https://medium.com/me/stats
 */

interface ArticlesIndexProps {
  articles: Article[];
}

const ArticlesIndex: NextPage<ArticlesIndexProps> = ({articles}) => {
  const articlesByYear = Array.from(
    articles.reduce((acc, article) => {
      const year = new Date(article.date).getFullYear().toString();
      if (!acc.has(year)) {
        acc.set(year, []);
      }
      acc.get(year)!.push(article);
      return acc;
    }, new Map<string, Article[]>())
  );

  return (
    <>
      <Head>
        <title>Articles - Vlad Holubiev</title>
        <meta
          name="description"
          content="I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 310,678 times so far."
        />
      </Head>
      <SimpleLayout
        title="Blog"
        intro="I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 310,678 times so far."
      >
        <div className="max-w-3xl space-y-12">
          {articlesByYear.map(([year, yearlyArticles]) => (
            <section key={year} className="space-y-6">
              <div className="md:sticky md:top-16 md:z-10 md:-mx-3 md:bg-white/95 md:px-3 md:py-2 md:backdrop-blur md:dark:bg-zinc-900/90">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                  {year}
                </span>
              </div>
              <div className="divide-y divide-zinc-900/5 border-t border-zinc-900/5 dark:divide-white/10 dark:border-white/10">
                {yearlyArticles.map(article => (
                  <Article key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </SimpleLayout>
    </>
  );
};

export default ArticlesIndex;

export const getStaticProps: GetStaticProps<ArticlesIndexProps> = async () => {
  return {
    props: {
      articles: (await getAllArticles()).map(({component: _component, ...meta}) => meta),
    },
  };
};
