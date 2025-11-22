import type {Metadata} from 'next';

import {UsesSectionList} from './UsesSectionList';
import {SimpleLayout} from '@/components/SimpleLayout';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
};

export default function Uses() {
  return (
    <SimpleLayout
      title={
        <>
          <span className="block">Software I use,</span>
          <span className="block">newsletters I&nbsp;read.</span>
        </>
      }
      intro="I get asked a lot about the things I use to build software and stay productive. Here's a big list of all of my favorite stuff."
    >
      <UsesSectionList />
    </SimpleLayout>
  );
}
