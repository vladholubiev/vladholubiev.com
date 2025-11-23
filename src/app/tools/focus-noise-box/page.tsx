import type {Metadata} from 'next';

import {NoiseBox} from '@/components/tools/NoiseBox';

export const metadata: Metadata = {
  title: 'Focus Noise Box',
  description:
    'Immersive analog-inspired broadband noise box (white, pink, brown) tuned to pair with ANC headphones.',
};

export default function FocusNoiseBoxPage() {
  return <NoiseBox />;
}
