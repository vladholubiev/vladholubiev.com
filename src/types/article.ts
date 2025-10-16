export interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  component?: React.ComponentType;
}

export interface ArticleMeta {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
}
