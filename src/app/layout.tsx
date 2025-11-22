import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import Script from 'next/script';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Providers} from './providers';

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
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Script id="theme-script" strategy="beforeInteractive">
          {modeScript}
        </Script>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Providers>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </Providers>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
