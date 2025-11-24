import Link from 'next/link';

import noiseBoxPreview from './noise-box-preview.jpg';
import ogImage from './og-image-article.jpeg';

import {ArticleLayout} from '@/components/ArticleLayout';
import {Heading} from '@/components/Heading';
import {
  AncControls,
  AncSpectrum,
  AncWave,
  BaselineBlock,
  ComboControls,
  ComboSpectrum,
  ComboWave,
  NoisySpectrum,
  NoisyToggles,
  NoisyWave,
  PinkNoiseBlock,
} from '@/components/stacking-quiet/Sections';
import {buildArticleMetadata} from '@/lib/seo';
import {StackingQuietProvider} from '@/components/stacking-quiet/StackingQuietProvider';
import {LinkPreview} from '@/components/ui/link-preview';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-11-23',
  title: 'The Missing Sound Your ANC Headphones Need',
  description: 'Learn about noise cancellation and masking in a visual way.',
  readingTime: '2 min read',
};

const slug = 'the-missing-sound-your-anc-headphones-need';

const baseMetadata = buildArticleMetadata({
  title: meta.title,
  description: meta.description,
  date: meta.date,
  slug,
});

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    images: [ogImage.src],
  },
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <StackingQuietProvider>
        <Heading level={2}>Pink noise</Heading>
        <p>
          Pink noise spreads equal energy across each octave, so bass and treble share the load
          instead of spiking like white noise.
        </p>
        <div className="not-prose my-6">
          <PinkNoiseBlock withAmbientNoise={false} />
        </div>
        <p>
          It is more pleasant to the ear and better for masking unwanted sounds, which is why
          it&apos;s often used in sound therapy and focus aids.
        </p>

        <p>
          In fact, it is so effective at <strong>sound masking</strong> that you can try it yourself
          - play any song on your laptop, then play pink noise on the same device, and after a while
          the pink noise will completely mask the song.
        </p>

        <p>
          I&apos;ve even built an analog-inspired pink noise box for you to play with it:&nbsp;
          <LinkPreview
            url="/tools/focus-noise-box"
            imageSrc={noiseBoxPreview.src}
            width={360}
            height={250}
            openInNewTab
          >
            <Link href="/tools/focus-noise-box" target="_blank" rel="noreferrer">
              Focus Noise Box
            </Link>
          </LinkPreview>
          .
        </p>

        <Heading level={2}>Ambient noise</Heading>

        <p>
          First, here is our reference line: background noise. This is what the room would look like
          if it were truly silent. Keep this picture in mind as we start adding layers back in.
        </p>
        <div className="not-prose my-6">
          <BaselineBlock />
        </div>

        <p>
          Now, let&apos;s play with some ambient noise you typically hear in public places. To put
          it simply - there are three bands of interest: low rumble (trains, HVAC), mid chatter
          (people talking), and high beeps (notifications, alarms).
        </p>
        <div className="not-prose my-6">
          <NoisyToggles />
        </div>
        <div className="not-prose my-6">
          <NoisyWave />
        </div>
        <p>Play with the toggles to see how each band contributes to the overall noise profile.</p>
        <div className="not-prose my-6">
          <NoisySpectrum />
        </div>

        <Heading level={2}>Active Noise Cancellation (ANC)</Heading>

        <p>
          ANC uses microphones to record the outside world, flips the waveform, and plays that
          inverse back through your headphones.
        </p>

        <div className="not-prose my-6">
          <AncControls />
        </div>
        <p>Slide and see how ANC &quot;flattens&quot; the ambient noise spectrum.</p>
        <div className="not-prose my-6">
          <AncWave />
        </div>

        <p>
          As you slide the ANC intensity slider to 100%, you&apos;ll see ~70% of relatively
          perceived noise from human chatter is still remaining. ANC does excellent job with lows,
          decent mids, and struggles with highs. Yes, conversation is muted a lot, but still, it can
          be just loud enough to let your brain spend energy on trying to decipher the words.
        </p>

        <div className="not-prose my-6">
          <AncSpectrum />
        </div>
        <p>
          How do you improve that? You can put on some music to silence that, but this is not the
          best solution if you need to focus.
        </p>

        <Heading level={2}>Bring the pink noise</Heading>
        <p>
          We already know the pink noise blankets everything evenly. We know ANC creates an opposite
          sound wave to silence noise. So why not combine them?
        </p>

        <div className="not-prose my-6">
          <ComboControls />
        </div>
        <div className="not-prose my-6">
          <ComboWave />
        </div>
        <p>
          Watch how little pink noise it takes once ANC clears the lows. With the ANC, even a low
          volume pink noise is enough to smoothen out the remaining noise peaks.
        </p>
        <div className="not-prose my-6">
          <ComboSpectrum />
        </div>

        <p>
          While the overall noise is higher, your ears do not perceive it as more intrusive. The
          difference between the base and the ambient noise spike is what matters.
        </p>

        <Heading level={2}>Try it yourself</Heading>
        <p>
          I liked the idea and built a vintage-inspired &quot;noise box&quot; to play different kind
          of noises!
        </p>
        <p>
          <LinkPreview
            url="/tools/focus-noise-box"
            imageSrc={noiseBoxPreview.src}
            width={360}
            height={250}
            openInNewTab
          >
            <Link href="/tools/focus-noise-box" target="_blank" rel="noreferrer">
              Focus Noise Box
            </Link>
          </LinkPreview>
          .
        </p>

        <p>Put on your ANC headphones, add a bit of pink noise, and watch the distraction fade!</p>
      </StackingQuietProvider>
    </ArticleLayout>
  );
}
