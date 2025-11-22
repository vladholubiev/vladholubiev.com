'use client';

import {ElementType, ReactNode, useId} from 'react';
import {HugeiconsIcon} from '@hugeicons/react';
import {
  Camera01Icon,
  ComputerIcon,
  ComputerTerminal01Icon,
  HeadphonesIcon,
  KeyboardIcon,
  Link02Icon,
  AiIdeaIcon,
  LaptopIcon,
  SourceCodeIcon,
  AppStoreIcon,
  VideoCameraAiIcon,
  Mouse02Icon,
  StopIcon,
  VisualStudioCodeIcon,
} from '@hugeicons/core-free-icons';

import {Card} from '@/components/Card';

type ToolItem = {
  title: string;
  description: string;
  href?: string;
  icon?: Parameters<typeof HugeiconsIcon>[0]['icon'];
};

type ToolItemCompact = {
  title: string;
  href?: string;
  icon?: Parameters<typeof HugeiconsIcon>[0]['icon'];
};

type UsesSection = {
  id: string;
  title: string;
  description: string;
  index: number;
  items: Array<ToolItem | ToolItemCompact>;
};

const sections: UsesSection[] = [
  {
    id: 'workstation',
    index: 1,
    title: 'Workstation',
    description: 'Hardware on my desk right now.',
    items: [
      {
        title: '14" MacBook Pro (M2 Max, 64GB, 2023)',
        icon: LaptopIcon,
        description:
          'Primary dev and writing machine. Extra CPU/RAM keeps many apps open without slowing down.',
      },
      {
        title: 'LG UltraWide 34WK95U-W (34", 5K2K)',
        icon: ComputerIcon,
        description:
          'Main display for side-by-side work. One TB3 cable powers and declutters the desk.',
      },
      {
        title: 'Logitech Ergo K860',
        icon: KeyboardIcon,
        description:
          'Daily keyboard for long sessions. Split layout and wrist rest keep hands relaxed.',
      },
      {
        title: 'Logitech MX Vertical',
        icon: Mouse02Icon,
        description:
          'Ergonomic mouse for all-day use. Vertical grip keeps my wrist neutral and cuts fatigue.',
      },
    ],
  },
  {
    id: 'audio',
    index: 2,
    title: 'Audio',
    description: 'Headphones, mics, and setups I’ll document soon.',
    items: [
      {
        title: 'AirPods Pro 3 (2025)',
        icon: HeadphonesIcon,
        description:
          'Daily earbuds for calls and focus. Strong ANC and seamless Apple handoff across devices.',
      },
    ],
  },
  {
    id: 'development',
    index: 3,
    title: 'Development',
    description: 'Tools I live in while building and shipping software.',
    items: [
      {
        title: 'Visual Studio Code',
        icon: VisualStudioCodeIcon,
        description: 'Primary editor. Fast and extension-rich after switching from WebStorm.',
      },
      {
        title: 'Ghostty',
        href: 'https://ghostty.org/',
        icon: ComputerTerminal01Icon,
        description: 'Go-to terminal. Launches instantly and stays light even with many tabs.',
      },
      {
        title: 'tmux',
        icon: StopIcon,
        description: 'Session manager. Juggles panes and lets me reconnect without losing context.',
      },
      {
        title: 'CleanShot X',
        icon: Camera01Icon,
        description:
          'Screenshot and recording tool with polished annotations and reliable scrolling capture.',
      },
      {
        title: 'DaVinci Resolve',
        href: 'https://www.blackmagicdesign.com/products/davinciresolve',
        icon: VideoCameraAiIcon,
        description:
          'Annotating screencasts without a steep learning curve; surprisingly great for this.',
      },
    ],
  },
  {
    id: 'writing',
    index: 4,
    title: 'Productivity',
    description: 'Software that keeps me shipping words and work.',
    items: [
      {
        title: 'AI coding tools (Claude Code, Codex, Copilot Agent)',
        icon: AiIdeaIcon,
        description:
          'Keep an AI pair for coding. Rotate tools as they evolve for drafts and refactors.',
      },
      {
        title: 'DevUtils',
        icon: SourceCodeIcon,
        description: 'Offline utility belt. Conversions, decoding, and diffing without a browser.',
      },
      {
        title: 'Setapp',
        href: 'https://setapp.com/',
        icon: AppStoreIcon,
        description:
          'Utility bundle. Covers Bartender, iStat Menus, Paletro, CleanMyMac, Sip, more.',
      },
    ],
  },
  {
    id: 'reading',
    index: 5,
    title: 'Reading',
    description: 'Newsletters and series I keep up with.',
    items: [
      {
        title: 'Hacker News',
        href: 'https://news.ycombinator.com/',
      },
      {
        title: 'ByteByteGo',
        href: 'https://blog.bytebytego.com/',
      },
      {
        title: 'Last Week in AWS',
        href: 'https://www.lastweekinaws.com/newsletter/',
      },
      {
        title: 'Node Weekly',
        href: 'https://nodeweekly.com/',
      },
      {
        title: 'Postgres Weekly',
        href: 'https://postgresweekly.com/',
      },
      {
        title: 'The Pragmatic Engineer',
        href: 'https://newsletter.pragmaticengineer.com/',
      },
      {
        title: 'Cheeky Pint',
        href: 'https://www.youtube.com/@stripe',
      },
      {
        title: 'Tech Radar',
        href: 'https://www.thoughtworks.com/radar',
      },
      {
        title: 'weekly.tf',
        href: 'https://www.weekly.tf/',
      },
      {
        title: 'TypeScript Weekly',
        href: 'https://typescript-weekly.com/',
      },
      {
        title: 'Simon Willison’s Weblog',
        href: 'https://simonwillison.net/',
      },
    ],
  },
];

function UsesSectionBlock({section, children}: {section: UsesSection; children: ReactNode}) {
  const generatedId = useId();
  const id = section.id ?? generatedId;
  const sectionNumber = section.index.toString().padStart(2, '0');

  return (
    <section
      aria-labelledby={id}
      id={id}
      className="relative isolate max-w-5xl border-t border-zinc-100 pt-10 first:mt-0 first:border-t-0 first:pt-0 dark:border-zinc-800 md:border-0 md:pt-0"
    >
      <div className="pointer-events-none absolute inset-y-[-18px] -left-6 sm:-left-8 md:-left-10 hidden w-[380px] sm:w-[420px] md:w-[460px] rounded-[26px] [background-image:radial-gradient(circle,_rgba(63,63,70,0.14)_1px,_transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_70%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_70%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] [-webkit-mask-composite:source-in] md:block dark:[background-image:radial-gradient(circle,_rgba(212,212,216,0.12)_1px,_transparent_1px)]" />

      <div className="relative grid grid-cols-1 items-start gap-y-6 gap-x-8 md:grid-cols-[minmax(200px,260px)_minmax(0,1fr)]">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="space-y-1">
            <h2 id={id} className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
              <span className="text-zinc-500 dark:text-zinc-500">{sectionNumber}</span>
              <span className="text-zinc-800 dark:text-zinc-100">{section.title}</span>
            </h2>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {section.description}
            </p>
          </div>
        </div>
        <div className="relative md:pl-8">
          <div className="space-y-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Tool({title, href, icon, meta, description}: ToolItem) {
  const iconChipClass =
    'relative self-start translate-y-[1px] flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 ring-1 ring-zinc-200/60 transition-colors duration-150 group-hover:bg-zinc-100 group-hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800/60 dark:group-hover:bg-zinc-800 dark:group-hover:text-zinc-100';

  const Wrapper: ElementType = href ? 'a' : 'div';
  const hasLink = Boolean(href);
  const chipIcon = icon ?? (hasLink ? Link02Icon : undefined);

  return (
    <Card as="li" className="group w-full">
      <Wrapper
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noreferrer noopener' : undefined}
        className="relative -mx-2 flex w-full items-start gap-4 rounded-2xl px-2 py-1.5 transition-all duration-150 hover:bg-zinc-200/35 hover:shadow-[0_1px_0_rgba(0,0,0,0.02)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 dark:hover:bg-zinc-800/35 dark:focus-visible:outline-zinc-700 sm:gap-5 sm:py-2"
      >
        {chipIcon ? (
          <span className={iconChipClass}>
            <HugeiconsIcon icon={chipIcon} className="h-5 w-5" strokeWidth={1.65} />
          </span>
        ) : (
          <span className="mt-1 h-9 w-9 shrink-0" aria-hidden />
        )}
        <div className="flex flex-col gap-1.5">
          <Card.Title
            as="h3"
            className="text-[1.05rem] font-semibold text-zinc-900 transition-colors duration-150 group-hover:text-zinc-800 dark:text-zinc-50 dark:group-hover:text-zinc-100"
          >
            {title}
          </Card.Title>
          <Card.Description className="mt-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </Card.Description>
          {meta ? (
            <Card.Description className="mt-0 text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
              {meta}
            </Card.Description>
          ) : null}
        </div>
        <span className="absolute inset-0 rounded-2xl" aria-hidden />
      </Wrapper>
    </Card>
  );
}

function ToolCompact({title, href, icon}: ToolItemCompact) {
  const iconChipClass =
    'relative self-start translate-y-[0.5px] flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 ring-1 ring-zinc-200/60 transition-colors duration-150 group-hover:bg-zinc-100 group-hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800/60 dark:group-hover:bg-zinc-800 dark:group-hover:text-zinc-100';

  const Wrapper: ElementType = href ? 'a' : 'div';
  const hasLink = Boolean(href);
  const chipIcon = icon ?? (hasLink ? Link02Icon : undefined);

  return (
    <Card as="li" className="group w-full">
      <Wrapper
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noreferrer noopener' : undefined}
        className="relative -mx-2 flex w-full items-center gap-3 rounded-2xl px-2 py-1.5 transition-all duration-150 hover:bg-zinc-200/35 hover:shadow-[0_1px_0_rgba(0,0,0,0.02)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 dark:hover:bg-zinc-800/35 dark:focus-visible:outline-zinc-700 sm:gap-3.5 sm:px-3 sm:py-1.5"
      >
        {chipIcon ? (
          <span className={iconChipClass}>
            <HugeiconsIcon icon={chipIcon} className="h-[18px] w-[18px]" strokeWidth={1.65} />
          </span>
        ) : (
          <span className="h-8 w-8 shrink-0" aria-hidden />
        )}
        <div className="flex flex-col">
          <Card.Title
            as="h3"
            className="text-base font-semibold tracking-tight text-zinc-900 transition-colors duration-150 group-hover:text-zinc-800 dark:text-zinc-50 dark:group-hover:text-zinc-100 sm:text-[1.02rem]"
          >
            {title}
          </Card.Title>
        </div>
        <span className="absolute inset-0 rounded-2xl" aria-hidden />
      </Wrapper>
    </Card>
  );
}

function ToolsSection({section}: {section: UsesSection}) {
  const allCompact = section.items.every(item => 'description' in item === false);

  return (
    <UsesSectionBlock section={section}>
      <ul
        role="list"
        className={allCompact ? 'space-y-3.5 sm:space-y-4' : 'space-y-7 sm:space-y-8'}
      >
        {section.items.map(item =>
          'description' in item ? (
            <Tool key={item.title} {...(item as ToolItem)} />
          ) : (
            <ToolCompact key={item.title} {...(item as ToolItemCompact)} />
          )
        )}
      </ul>
    </UsesSectionBlock>
  );
}

export function UsesSectionList() {
  return (
    <>
      <div className="mt-8 space-y-14 sm:mt-12 sm:space-y-20">
        {sections.map(section => (
          <ToolsSection key={section.id} section={section} />
        ))}
      </div>
    </>
  );
}
