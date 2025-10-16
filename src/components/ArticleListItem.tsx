import Link from 'next/link';

interface ArticleListItemProps {
  title: string;
  href: string;
  date: string;
  readingTime: string;
  description?: string;
}

export function ArticleListItem({title, href, date, readingTime}: ArticleListItemProps) {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleString('en-US', {month: 'short'}).toUpperCase();
  const day = parsedDate.toLocaleString('en-US', {day: 'numeric'});
  const isExternal = /^https?:\/\//.test(href);
  const trailingGlyph = isExternal ? '↗' : '›';

  const glyphBaseClasses =
    'text-lg font-semibold text-zinc-400 transition duration-200 ease-out group-hover:translate-x-1 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300';

  return (
    <article className="py-6">
      <Link
        href={href}
        aria-label={`Read "${title}"${isExternal ? ' (opens in a new tab)' : ''}`}
        className="group relative block -mx-4 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ua-blue-500 sm:-mx-8 sm:px-8 lg:mx-auto lg:max-w-3xl lg:px-0"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
      >
        <div className="relative isolate transition duration-200 ease-out group-hover:-translate-y-0.5">
          <div className="absolute inset-0 rounded-2xl bg-transparent transition duration-200 ease-out group-hover:bg-zinc-900/5 dark:group-hover:bg-white/10" />
          <div className="absolute inset-0 rounded-2xl opacity-0 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition duration-200 ease-out group-hover:opacity-100 dark:shadow-[0_1px_2px_rgba(10,10,10,0.4)]" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent transition duration-200 ease-out group-hover:ring-zinc-900/10 dark:group-hover:ring-white/15" />

          <div className="relative grid grid-cols-1 gap-y-4 px-5 py-6 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-x-6 md:px-6">
            <time
              dateTime={date}
              className="order-first flex flex-col items-start gap-1 text-left tabular-nums md:order-none md:col-start-1 md:row-span-2 md:w-24 md:items-end md:text-right"
            >
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {month}
              </span>
              <span className="text-lg font-semibold tracking-tight text-zinc-600 tabular-nums dark:text-zinc-200">
                {day}
              </span>
            </time>

            <div className="flex flex-col gap-2 md:col-start-2 md:row-span-2">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="flex-1 text-lg font-semibold leading-snug tracking-[-0.012em] text-zinc-900 dark:text-zinc-50">
                  {title}
                </h3>
                <span className={`${glyphBaseClasses} leading-none`} aria-hidden="true">
                  {trailingGlyph}
                </span>
                {isExternal ? <span className="sr-only">Opens in new tab</span> : null}
              </div>
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {readingTime}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
