import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href} openInNewTab={true}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Vlad Holubiev</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, newsletters I read."
        intro="I get asked a lot about the things I use to build software and stay productive. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="16” MacBook Pro, M1 Max, 64GB RAM (2021)">
              I was using a 13” 16GB M1 MacBook Pro prior to this. Extra RAM
              and more CPU cores are a game changer for me. I’m able to run
              more apps at once without worrying about performance.
            </Tool>
            <Tool title="LG UltraWide 34WK95U-W">
              34” display with 5120x2160 resolution and 21:9 aspect ratio.
              It has a Thunderbolt port, so I can connect it to my MacBook
              with a single cable for power and display. I love the extra
              horizontal space for working with 2 windows side-by-side.
            </Tool>
            <Tool title="Apple Magic Keyboard with Touch ID">
              It works great with MacBook Pro and I love the Touch ID
              integration. I don’t have to type my password 100 times a day.
            </Tool>
            <Tool title="Logitech MX Master 3 For Mac">
              I enjoy the extra buttons and the LogiOptions+ software to
              customize extra buttons and gestures for different apps.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="WebStorm">
              After using WebStorm for about a decade, I can’t imagine using
              anything else. My workflow is so optimized around it that I
              don’t think I could be as productive in any other editor.
              I use other JetBrains products too, like DataGrip and PyCharm.
            </Tool>
            <Tool title="iTerm2">
              I’m honestly not using it to full potential, but the things I like
              over the default Terminal.app are: better autocomplete, better mouse support
              for text selection, better search and large scrollback buffer.
            </Tool>
            <Tool title="CleanShot X">
              After trying many different screenshot tools, this is the only one
              that meets all of my needs. It struck me with beautiful annotation tools,
              auto-scroll screenshots, and decent screen recording features.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Paste" href="https://pasteapp.io/">
              Clipboard history manager is a must-have tool for me. Need to recall
              a code snippet from a month ago? Paste has got you covered.
            </Tool>
            <Tool title="Github Copilot">
              Thanks to Copilot, I enjoy coding more than ever. It saves time
              writing ”boring” code and helps me focus on the interesting parts.
            </Tool>
            <Tool title="GPT-4">
              I use GPT-4 for all sorts of coding & writing tasks, and interestingly
              to create new productivity tools based on it. It deserves a separate article.
            </Tool>
            <Tool title="DevUtils">
              This is a swiss army knife for developers. It can convert JSON to CSV,
              decode Base64, JWT, URLs, diff text, generate Lorem Ipsum, and much more.
            </Tool>
            <Tool title="Setapp" href="https://setapp.com/">
              Other productivity apps from Setapp subscription not mentioned above are:
              Bartender, iStats Menus, Paletro, CleanMyMac X, Prizmo, Sip.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Newsletters">
            <Tool title="ByteByteGo" href="https://blog.bytebytego.com/">
              It covers interesting bits of software architecture and distributed systems.
              I like how they explain complex topics in a simple way.
            </Tool>
            <Tool title="Last Week in AWS" href="https://www.lastweekinaws.com/newsletter/">
              Since I work with AWS every day, it helps to stay up to date with the latest
              releases through insightful commentary.
            </Tool>
            <Tool title="Node Weekly" href="https://nodeweekly.com/">
              Lately I rarely find useful news there, but I still keep it for
              occasional gems.
            </Tool>
            <Tool title="Postgres Weekly" href="https://postgresweekly.com/">
              I’ve started using Postgres not so long ago, so this newsletter
              is an invaluable source of knowledge for me at the moment.
            </Tool>
            <Tool title="The Pragmatic Engineer" href="https://newsletter.pragmaticengineer.com/">
              Occasionally I find an interesting read there on the inner workings
              of software engineering in some well-known companies.
            </Tool>
            <Tool title="Serverless Status" href="https://serverless.email/">
              Serverless is a big part of my work, so this one helps to stay
              up to date with the cutting edge stuff of the ecosystem.
            </Tool>
            <Tool title="Tech Radar" href="https://www.thoughtworks.com/radar">
              Published quarterly, it is always filled with dozens of new tools,
              techniques, frameworks and ideas to explore.
            </Tool>
            <Tool title="weekly.tf" href="https://www.weekly.tf/">
              I’m a big fan of Terraform and I find insightful articles, novel
              tools and latest best practice in this newsletter.
            </Tool>
            <Tool title="TypeScript Weekly" href="https://typescript-weekly.com/">
              TypeScript releases are pretty technical, so I am always on a lookout
              for good follow-up articles in this newsletter.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
