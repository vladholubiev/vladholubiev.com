import type {ComponentType} from 'react';

export interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  mediumUrl?: string;
  component?: ComponentType;
}

export interface ArticleMeta {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  mediumUrl?: string;
}
