import {useEffect, useRef} from 'react';
import {Analytics} from '@vercel/analytics/react';
import type {AppProps} from 'next/app';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';

import '@/styles/tailwind.css';
import 'focus-visible';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({Component, pageProps, router}: AppProps) {
  const previousPathname = usePrevious(router.pathname);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
      >
        Skip to main content
      </a>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main id="main-content">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
}
