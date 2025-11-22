import type {Metadata} from 'next';
import {ReactNode} from 'react';

import {Card} from '@/components/Card';
import {Section} from '@/components/Section';
import {SimpleLayout} from '@/components/SimpleLayout';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
};

interface ToolsSectionProps {
  children: ReactNode;
  title: string;
}

function ToolsSection({children, ...props}: ToolsSectionProps) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

interface ToolProps {
  title: string;
  href?: string;
  children: ReactNode;
}

function Tool({title, href, children}: ToolProps) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href} openInNewTab={true}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, newsletters I read."
      intro="I get asked a lot about the things I use to build software and stay productive. Here's a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title='14" MacBook Pro, M2 Max, 64GB RAM (2023)'>
            I was using a 13&quot; 16GB M1 MacBook Pro earlier. Extra RAM and more CPU cores are a
            game changer for me. I&apos;m able to run more apps at once without worrying about
            performance.
          </Tool>
          <Tool title="LG UltraWide 34WK95U-W">
            34&quot; display with 5120x2160 resolution and 21:9 aspect ratio. It has a Thunderbolt
            port, so I can connect it to my MacBook with a single cable for power and display. I
            love the extra horizontal space for working with 2 windows side-by-side.
          </Tool>
          <Tool title="Logitech Ergo K860">
            Switched from the Apple Magic Keyboard to the Logitech Ergo K860 due to its ergonomic
            design. Its split layout, cushioned wrist rest, and negative tilt significantly reduced
            wrist strain and improved typing comfort during long coding sessions.
          </Tool>
          <Tool title="Logitech MX Vertical">
            Recently upgraded from the Logitech MX Master 3 to the Logitech MX Vertical for its
            ergonomic design. The vertical orientation helps reduce wrist strain and promotes a more
            natural hand position, providing greater comfort during extended periods of work.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            After using WebStorm for nearly ten years, I made the switch to VS Code and I&apos;m
            really enjoying it. It&apos;s quicker and offers a broader range of extensions.
          </Tool>
          <Tool title="Ghostty" href="https://ghostty.org/">
            I recently switched from iTerm2 to Ghostty. It launches fast, stays lightweight even
            with plenty of tabs, and its plain-text config keeps tweaks straightforward without
            endless menus. Works seamlessly with Nerd Fonts.
          </Tool>
          <Tool title="tmux">
            Tmux has been invaluable for juggling many parallel AI sessions; I can split panes,
            detach sessions, and jump back in without disrupting long-running agents or context.
          </Tool>
          <Tool title="CleanShot X">
            After trying many different screenshot tools, this is the only one that meets all of my
            needs. It struck me with beautiful annotation tools, auto-scroll screenshots, and decent
            screen recording features.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="AI-powered coding tools (Claude Code, OpenAI Codex, GitHub Copilot Agent)">
            I&apos;m always exploring the cutting-edge in AI coding assistants. My current favorites
            include OpenAI Codex, Claude Code. This space evolves rapidly, so the list is always
            changing.
          </Tool>
          <Tool title="DevUtils">
            This is a swiss army knife for developers. It can convert JSON to CSV, decode Base64,
            JWT, URLs, diff text, generate Lorem Ipsum, and much more.
          </Tool>
          <Tool title="Setapp" href="https://setapp.com/">
            Other productivity apps from Setapp subscription not mentioned above are: Bartender,
            iStats Menus, Paletro, CleanMyMac X, Prizmo, Sip.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Newsletters">
          <Tool title="ByteByteGo" href="https://blog.bytebytego.com/">
            It covers interesting bits of software architecture and distributed systems. I like how
            they explain complex topics in a simple way.
          </Tool>
          <Tool title="Last Week in AWS" href="https://www.lastweekinaws.com/newsletter/">
            Since I work with AWS every day, it helps to stay up to date with the latest releases
            through insightful commentary.
          </Tool>
          <Tool title="Node Weekly" href="https://nodeweekly.com/">
            Lately I rarely find useful news there, but I still keep it for occasional gems.
          </Tool>
          <Tool title="Postgres Weekly" href="https://postgresweekly.com/">
            I&apos;ve started using Postgres not so long ago, so this newsletter is an invaluable
            source of knowledge for me at the moment.
          </Tool>
          <Tool title="The Pragmatic Engineer" href="https://newsletter.pragmaticengineer.com/">
            I always look forward to the deep-dive newsletter issues, and I pair them with the
            interview series on{' '}
            <a href="https://www.youtube.com/@pragmaticengineer" target="_blank" rel="noreferrer">
              YouTube
            </a>{' '}
            for extra context from engineering leaders.
          </Tool>
          <Tool title="Cheeky Pint (Stripe)" href="https://www.youtube.com/@stripe">
            Stripe&apos;s Cheeky Pint interviews offer candid conversations with tech
            leaders—perfect for a quick inspiration boost alongside my newsletter queue.
          </Tool>
          <Tool title="Tech Radar" href="https://www.thoughtworks.com/radar">
            Published quarterly, it is always filled with dozens of new tools, techniques,
            frameworks and ideas to explore.
          </Tool>
          <Tool title="weekly.tf" href="https://www.weekly.tf/">
            I&apos;m a big fan of Terraform and I find insightful articles, novel tools and latest
            best practice in this newsletter.
          </Tool>
          <Tool title="TypeScript Weekly" href="https://typescript-weekly.com/">
            TypeScript releases are pretty technical, so I am always on a lookout for good follow-up
            articles in this newsletter.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
