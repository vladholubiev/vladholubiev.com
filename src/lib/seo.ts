import type {Metadata} from 'next';

export const SITE_AUTHOR = 'Vladyslav Holubiev';
export const DEFAULT_OG_IMAGE = '/avatar.jpg';

type ArticleMetaInput = {
  title: string;
  description?: string;
  date: string;
  slug: string;
};

export function buildArticleMetadata(meta: ArticleMetaInput): Metadata {
  const description = meta.description || meta.title;

  return {
    title: meta.title,
    description,
    alternates: {
      canonical: `/articles/${meta.slug}`,
    },
    openGraph: {
      type: 'article',
      title: meta.title,
      description,
      url: `/articles/${meta.slug}`,
      publishedTime: meta.date,
      authors: [SITE_AUTHOR],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
