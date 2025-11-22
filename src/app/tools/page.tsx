import type {Metadata} from 'next';

import {Card} from '@/components/Card';
import {SimpleLayout} from '@/components/SimpleLayout';

export const metadata: Metadata = {
  title: 'Tools',
  description: "A staging area for small, focused tools I'm building for my own workflow.",
};

const tools = [
  {
    name: 'Focus Noise Box',
    href: '/tools/focus-noise-box',
    description:
      'Add a soft wall of noise under your ANC so nearby voices and clatter blend away instead of breaking your focus.',
  },
];

export default function Tools() {
  return (
    <SimpleLayout
      title="Tools for everyday workflows."
      intro="A growing shelf of lightweight utilities I use myself. Click a tool to open it."
    >
      <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(tool => (
          <Card as="li" key={tool.name}>
            <Card.Title as="h3" href={tool.href}>
              {tool.name}
            </Card.Title>
            <Card.Description>{tool.description}</Card.Description>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  );
}
