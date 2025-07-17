export interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  component?: React.ComponentType;
}

export interface ArticleMeta {
  title: string;
  description: string;
  author: string;
  date: string;
}