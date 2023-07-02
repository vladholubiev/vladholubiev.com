import logoShelf from '@/images/logos/shelf.svg';
import logoApiko from '@/images/logos/apiko.png';
import logoUpwork from '@/images/logos/upwork.svg';
import Image from 'next/image';
import {Button} from '@/components/Button';
import {BriefcaseIcon} from '@/components/icons/BriefcaseIcon';
import {LinkedInIcon} from '@/components/icons/SocialIcons';
import {LINKEDIN} from '@/lib/social-links';

export function Resume() {
  let resume = [
    {
      company: 'Shelf',
      title: 'Sr. Director of Technology',
      logo: logoShelf,
      start: '2016',
      end: {
        label: 'Now',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Apiko',
      title: 'Software Engineer',
      logo: logoApiko,
      start: '2015',
      end: '2016',
    },
    {
      company: 'Freelance',
      title: 'Software Engineer',
      logo: logoUpwork,
      start: '2013',
      end: '2014',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none"/>
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div
              className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized/>
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>
                {' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href={LINKEDIN} variant="secondary"
              className="group mt-6 w-full">
        <LinkedInIcon
          className="h-4 w-4 transition group-active:stroke-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
        Read more on LinkedIn
      </Button>
    </div>
  )
}




