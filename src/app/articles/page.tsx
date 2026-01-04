import type { Metadata } from 'next';
import { ArticleListItem } from '@/components/ArticleListItem';
import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllArticles } from '@/lib/getAllArticles';
import type { Article } from '@/types/article';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 310,678 times so far.',
};

function ArticleItem({ article }: { article: Article }) {
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

export default async function ArticlesIndex() {
  const articles = (await getAllArticles()).map(({ component, ...meta }) => {
    void component;
    return meta;
  });

  const articlesByYear = Array.from(
    articles.reduce((acc, article) => {
      const year = new Date(article.date).getFullYear().toString();
      const entries = acc.get(year);
      if (entries) {
        entries.push(article);
      } else {
        acc.set(year, [article]);
      }
      return acc;
    }, new Map<string, Article[]>()),
  );

  return (
    <SimpleLayout
      title="Blog"
      intro="I write mostly about interesting problems I solve to spread the knowledge and help others. My articles on Medium were viewed over 310,678 times so far."
    >
      <div className="mx-auto max-w-3xl space-y-12">
        {articlesByYear.map(([year, yearlyArticles]) => (
          <section key={year} className="space-y-6">
            <div className="md:sticky md:top-16 md:z-10 md:-mx-3 md:bg-white/95 md:px-3 md:py-2 md:backdrop-blur md:dark:bg-zinc-900/90">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {year}
              </span>
            </div>
            <div className="divide-y divide-zinc-900/5 border-t border-zinc-900/5 dark:divide-white/10 dark:border-white/10">
              {yearlyArticles.map((article) => (
                <ArticleItem key={article.slug} article={article} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </SimpleLayout>
  );
}
