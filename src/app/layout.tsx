import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import Script from 'next/script';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

import {AppShell} from '@/components/AppShell';

import '@/styles/tailwind.css';

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('**:transition-none!')
    window.setTimeout(() => {
      document.documentElement.classList.remove('**:transition-none!')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

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
        <Script id="theme-script" strategy="beforeInteractive">
          {modeScript}
        </Script>
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
