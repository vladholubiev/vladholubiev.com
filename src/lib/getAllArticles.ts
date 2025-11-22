import glob from 'fast-glob';
import * as path from 'path';
import type {ComponentType} from 'react';
import {Article, ArticleMeta} from '@/types/article';

async function importArticle(articleFilename: string): Promise<Article> {
  const {meta, default: component} = (await import(`../app/articles/${articleFilename}`)) as {
    meta: ArticleMeta;
    default: ComponentType;
  };

  return {
    slug: articleFilename.replace(/\/page\.tsx$/, ''),
    ...meta,
    component,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articleFilenames = await glob(['*/page.tsx'], {
    cwd: path.join(process.cwd(), 'src/app/articles'),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
