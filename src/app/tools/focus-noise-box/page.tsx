import type {Metadata} from 'next';

import {NoiseBox} from '@/components/tools/NoiseBox';
import ogNoiseBox from './og-noise-box.jpeg';

export const metadata: Metadata = {
  title: 'Focus Noise Box',
  description:
    'Immersive analog-inspired broadband noise box (white, pink, brown) tuned to pair with ANC headphones.',
  openGraph: {
    type: 'website',
    title: 'Focus Noise Box',
    description:
      'Immersive analog-inspired broadband noise box (white, pink, brown) tuned to pair with ANC headphones.',
    url: '/tools/focus-noise-box',
    images: [
      {
        url: ogNoiseBox.src,
        width: ogNoiseBox.width,
        height: ogNoiseBox.height,
        alt: 'Focus Noise Box preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Noise Box',
    description:
      'Immersive analog-inspired broadband noise box (white, pink, brown) tuned to pair with ANC headphones.',
    images: [ogNoiseBox.src],
  },
};

export default function FocusNoiseBoxPage() {
  return <NoiseBox />;
}
