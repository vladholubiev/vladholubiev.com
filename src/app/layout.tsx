import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

import {AppShell} from '@/components/AppShell';
import {ThemeProvider} from '@/components/ThemeProvider';

import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    default: 'Vladyslav Holubiev',
    template: '%s - Vladyslav Holubiev',
  },
  description:
    'Technology leader delivering AI products and engineering excellence. Senior Director of Technology at Shelf.',
  metadataBase: new URL('https://vladholubiev.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vladyslav Holubiev',
    description:
      'Technology leader delivering AI products and engineering excellence. Senior Director of Technology at Shelf.',
    url: '/',
    siteName: 'Vladyslav Holubiev',
    images: ['/avatar.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vladholubiev',
    creator: '@vladholubiev',
    title: 'Vladyslav Holubiev',
    description:
      'Technology leader delivering AI products and engineering excellence. Senior Director of Technology at Shelf.',
    images: ['/avatar.jpg'],
  },
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
