import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/icons/SocialIcons'
import portraitImage from '@/images/avatar.jpg'
import {EMAIL, GITHUB, INSTAGRAM, LINKEDIN, TWITTER} from '@/lib/social-links';
import {MailIcon} from '@/components/icons/MailIcon';

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-ua-blue-500 dark:text-zinc-200 dark:hover:text-ua-blue-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-ua-blue-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}


export default function About() {
  return (
    <>
      <Head>
        <title>About - Vlad Holubiev</title>
        <meta
          name="description"
          content="I’m Vlad Holubiev."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              About me
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I’ve loved tinkering with computers for as long as I can remember, and
                wrote my first program when I was 14 years old right after I got my first computer.
                I began my commercial experience by freelancing back in the school at 15, when I designed
                and developed websites using JavaScript, jQuery and Wordpress.
              </p>
              <p>
                Later, at 16 I realized Backend is my passion so I started learning Java.
                Finding a freelance job as a Java developer was a challenge, so I used to
                develop Java applications and Chrome Extensions for a Google MapMaker Ukraine
                community for free. It was automating the process of mapping Ukraine in Google Maps
                and caught attention of Google MapMaker team from California. I was invited to
                several Google MapMaker summits around Ukraine organized by Google Ukraine HQ.
              </p>
              <p>
                At 17 when I enrolled in university, I found my passion in developing
                Android applications. It was an application that integrated
                with the university’s backend and allowed students to view their
                grades and university news. It quickly gained popularity and had
                more than 1,000 WAU users in the first month.
              </p>
              <p>
                At 18 I went back to JavaScript ecosystem and started learning Node.js
                as it felt more modern and flexible. As a learning project I developed
                a web version of my university’s Android app.
                That enabled me to quickly find a job as a Full-Stack JavaScript developer
                at Apiko in Ternopil.
              </p>
              <p>
                Later that year, I decided to move to Lviv and joined a startup called
                Shelf. I started as a Junior Software Engineer as one of the first three
                dev team members and today I oversee the entire technical landscape
                in the role of a Senior Director of Technology.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={TWITTER} icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href={INSTAGRAM} icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href={GITHUB} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href={LINKEDIN} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href={`mailto:${EMAIL}`}
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {EMAIL}
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
