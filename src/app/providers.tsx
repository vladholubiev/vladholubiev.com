'use client';

import type { ReactNode } from 'react';
import 'focus-visible';

import { NavigationProvider } from '@/components/navigation/NavigationProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
