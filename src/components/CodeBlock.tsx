'use client';

import { ShikiHighlighter } from 'react-shiki';

interface CodeBlockProps {
  language: string;
  theme?: string;
  showLanguage?: boolean;
  addDefaultStyles?: boolean;
  children: string;
}

export function CodeBlock({
  language,
  theme = 'github-dark',
  showLanguage = false,
  addDefaultStyles = true,
  children,
}: CodeBlockProps) {
  return (
    <ShikiHighlighter
      language={language}
      theme={theme}
      showLanguage={showLanguage}
      addDefaultStyles={addDefaultStyles}
    >
      {children}
    </ShikiHighlighter>
  );
}
