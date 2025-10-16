import glob from 'fast-glob';
import * as path from 'path';
import {Article, ArticleMeta} from '@/types/article';

async function importArticle(articleFilename: string): Promise<Article> {
  const {meta, default: component} = (await import(`../pages/articles/${articleFilename}`)) as {
    meta: ArticleMeta;
    default: React.ComponentType;
  };

  return {
    slug: articleFilename.replace(/(\/index)?\.tsx$/, ''),
    ...meta,
    component,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articleFilenames = await glob(['*/index.tsx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
