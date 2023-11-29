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
                I’ve always had a passion for playing around with computers, and I wrote my first program at the age of 14, 
                shortly after getting my very first computer. I started gaining commercial experience by 
                freelancing during my school years, at 15, when I created and developed websites using JavaScript, jQuery, and WordPress.
              </p>
              <p>
                Later, at 16, I discovered my passion for backend development and began learning Java. 
                Finding freelance work as a Java developer proved challenging, so I started developing Java applications and 
                Chrome Extensions for the Google MapMaker Ukraine community on a voluntary basis. 
                These projects automated the process of mapping Ukraine on Google Maps and caught the attention of the Google MapMaker team in California. 
                Consequently, I was invited to attend several Google MapMaker summits across Ukraine, organized by the Google Ukraine headquarters.
              </p>
              <p>
                When I started university at 17, I discovered a passion for developing Android apps. 
                My first project was an app that connected to the university’s backend, enabling students to 
                check their grades and get the latest campus news. It took off faster than I expected, 
                attracting over 1,000 weekly active users within the first month.
              </p>
              <p>
                At 18, I returned to the JavaScript ecosystem and began learning Node.js because 
                it seemed more contemporary and versatile. For a learning project, I created a web 
                version of my university’s Android app. This experience helped me quickly secure a 
                position as a Full-Stack JavaScript developer at Apiko in Ternopil.
              </p>
              <p>
                Later that year, I made the decision to relocate to Lviv and joined a startup named Shelf. 
                I began my journey there as a Junior Software Engineer, one of the initial three members of the development team. 
                It was an incredibly hectic period of coding, and I managed to become one of the&nbsp;
                <Link href="https://web.archive.org/web/20211028163159/https://commits.top/ukraine_private.html" target="_blank" >top three</Link>&nbsp;
                GitHub contributors in Ukraine.
              </p>
              <p>
                Today, I manage the entire technical landscape at Shelf as the Senior Director of Technology.
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
