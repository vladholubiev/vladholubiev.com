import Head from 'next/head';
import {NextPage} from 'next';

import {ToolLayout} from '@/components/ToolLayout';
import NoiseMachine from '@/components/tools/NoiseMachine';

const blueprintStyle = {
  backgroundColor: '#1f6cbe',
  backgroundImage: `
    linear-gradient(#2b76c7 1px, transparent 1px),
    linear-gradient(90deg, #2b76c7 1px, transparent 1px),
    linear-gradient(#3a86d9 8px, transparent 8px),
    linear-gradient(90deg, #3a86d9 8px, transparent 8px)
  `,
  backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0',
} as const;

const FocusNoiseBoxPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Focus Noise Box - Tools - Vlad Holubiev</title>
        <meta
          name="description"
          content="Analog-inspired broadband noise generator (white, pink, brown) tuned to pair with ANC headphones."
        />
      </Head>
      <ToolLayout
        title="Focus Noise Box"
        intro="ANC is great at killing low rumble; this fills in what is left. Play white, pink, or brown noise under your noise-cancelling headphones so speech, clinks, and chair scrapes sink into a steady background while you read or work."
      >
        <div className="relative isolate -mx-4 overflow-hidden rounded-3xl px-4 py-8 sm:-mx-8 sm:px-10 sm:py-12 lg:-mx-12">
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={blueprintStyle}
          >
            <div className="absolute inset-0 border border-white/10" />
          </div>
          <div className="relative flex items-start justify-center md:min-h-[70vh] md:items-center">
            <div className="relative z-10 scale-95 transition-transform md:scale-100">
              <NoiseMachine />
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default FocusNoiseBoxPage;
