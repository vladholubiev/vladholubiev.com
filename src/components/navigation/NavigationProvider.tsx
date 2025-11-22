'use client';

import {ReactNode, createContext, useContext, useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';

interface NavigationContextValue {
  previousPathname?: string;
}

const NavigationContext = createContext<NavigationContextValue>({});

export function NavigationProvider({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const lastPathRef = useRef<string | undefined>(pathname ?? undefined);
  const [previousPathname, setPreviousPathname] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!pathname) return;

    if (lastPathRef.current !== pathname) {
      setPreviousPathname(lastPathRef.current);
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{previousPathname}}>{children}</NavigationContext.Provider>
  );
}

export function usePreviousPathname() {
  return useContext(NavigationContext).previousPathname;
}
