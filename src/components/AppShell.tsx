'use client';

import type {ReactNode} from 'react';
import {usePathname} from 'next/navigation';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {Providers} from '@/app/providers';

const IMMERSIVE_ROUTES = ['/tools/focus-noise-box'];

export function AppShell({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const isImmersive = IMMERSIVE_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isImmersive) {
    return (
      <Providers>
        <main id="main-content">{children}</main>
      </Providers>
    );
  }

  return (
    <Providers>
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
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
