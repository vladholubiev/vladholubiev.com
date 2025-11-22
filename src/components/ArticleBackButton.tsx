'use client';

import {useRouter} from 'next/navigation';

import {usePreviousPathname} from '@/components/navigation/NavigationProvider';
import {ArrowLeftIcon} from '@/components/icons/ArrowLeftIcon';

export function ArticleBackButton() {
  const router = useRouter();
  const previousPathname = usePreviousPathname();

  if (!previousPathname) return null;

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back to articles"
      className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
    >
      <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
    </button>
  );
}
