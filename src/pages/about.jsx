import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon, MediumIcon, StackOverflowIcon,
  TwitterIcon
} from "@/components/icons/SocialIcons";
import portraitImage from '@/images/avatar.jpg'
import {
  EMAIL,
  GITHUB,
  INSTAGRAM,
  LINKEDIN,
  MEDIUM,
  STACKOVERFLOW,
  TWITTER
} from "@/lib/social-links";
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
                I’ve always been passionate about tinkering with computers - I wrote my first program at the age of 14 
                shortly after receiving my very first computer. By 15, I started gaining commercial experience through 
                freelance projects, developing websites using JavaScript, jQuery, and WordPress while still attending school.
              </p>
              <p>
                At 16, I discovered my interest in backend development and began learning Java.
                Since Java freelance projects were difficult to find at the time, I volunteered to build Java applications and Chrome extensions for the Google MapMaker Ukraine community.
                These tools automated the mapping of Ukraine and caught the attention of Google’s MapMaker team in California. 
                As a result, Google Ukraine HQ recognized my contributions and invited me to several national Google MapMaker summits held in different cities across Ukraine.
              </p>
              <p>
                When I started university at 17, I developed a keen interest in Android application development.
                My first Android project allowed students to connect to our university’s backend system to check their grades and read the latest campus news.
                The application quickly gained popularity, reaching over 1,000 weekly active users within the first month alone.
              </p>
              <p>
                At 18, I returned to the JavaScript ecosystem and began experimenting with Node.js, attracted by its modern approach and flexibility.
                As a learning project, I created a web version of the university Android app.
                This experience soon helped me land a position as a Full-Stack JavaScript developer at Apiko in Ternopil.
              </p>
              <p>
                Later that year, I relocated to Lviv to join a startup called Shelf as one of its initial three engineers.
                It was an incredibly exciting and intensive phase of coding - I even became one of the &nbsp;
                <Link href="https://web.archive.org/web/20211028163159/https://commits.top/ukraine_private.html" target="_blank" >top three</Link>&nbsp;
                GitHub contributors in Ukraine.
              </p>
              <p>
                Today, I oversee the entire technical landscape at Shelf as the Senior Director of Technology.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={TWITTER} icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href={LINKEDIN} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink href={MEDIUM} icon={MediumIcon} className="mt-4">
                Follow on Medium
              </SocialLink>
              <SocialLink href={INSTAGRAM} icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href={STACKOVERFLOW} icon={StackOverflowIcon} className="mt-4">
                See on StackOverflow
              </SocialLink>
              <SocialLink href={GITHUB} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
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
