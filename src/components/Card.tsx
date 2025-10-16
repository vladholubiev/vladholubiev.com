import Link from 'next/link';
import clsx from 'clsx';
import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';
import {ChevronRightIcon} from '@/components/icons/ChevronRightIcon';

interface CardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Card({as: Component = 'div', className, children}: CardProps) {
  return (
    <Component className={clsx(className, 'group relative flex flex-col items-start')}>
      {children}
    </Component>
  );
}

type CardLinkProps = {
  children: ReactNode;
  href: string;
  openInNewTab?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'children' | 'className'>;

Card.Link = function CardLink({children, href, openInNewTab, ...props}: CardLinkProps) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel="noopener noreferrer"
        {...props}
      >
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

interface CardTitleProps {
  as?: ElementType;
  href?: string;
  children: ReactNode;
  openInNewTab?: boolean;
}

Card.Title = function CardTitle({
  as: Component = 'h2',
  href,
  children,
  openInNewTab = false,
}: CardTitleProps) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? (
        <Card.Link href={href} openInNewTab={openInNewTab}>
          {children}
        </Card.Link>
      ) : (
        children
      )}
    </Component>
  );
};

interface CardDescriptionProps {
  children: ReactNode;
}

Card.Description = function CardDescription({children}: CardDescriptionProps) {
  return <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</p>;
};

interface CardCtaProps {
  children: ReactNode;
}

Card.Cta = function CardCta({children}: CardCtaProps) {
  return (
    <div
      aria-hidden="true"
      className="text-ua-blue-500 dark:text-ua-blue-300 relative z-10 mt-4 flex items-center text-sm font-medium"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

type CardEyebrowProps<T extends ElementType = 'p'> = {
  as?: T;
  decorate?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

Card.Eyebrow = function CardEyebrow<T extends ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps<T>) {
  const ComponentTag = as ?? 'p';

  return (
    <ComponentTag
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </ComponentTag>
  );
};
