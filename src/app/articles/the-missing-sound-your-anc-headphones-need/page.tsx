import Link from 'next/link';

import {ArticleLayout} from '@/components/ArticleLayout';
import {Heading} from '@/components/Heading';
import {
  AncBlock,
  BaselineBlock,
  ComboBlock,
  NoisyBlock,
  PinkNoiseBlock,
} from '@/components/stacking-quiet/Sections';
import {buildArticleMetadata} from '@/lib/seo';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-11-23',
  title: 'The Missing Sound Your ANC Headphones Need',
  description: 'Interactive visualizations of noise cancellation and masking.',
  readingTime: '2 min read',
};

const slug = 'the-missing-sound-your-anc-headphones-need';

export const metadata = buildArticleMetadata({
  title: meta.title,
  description: meta.description,
  date: meta.date,
  slug,
});

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
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
        In fact, it is so effective at <strong>sound masking</strong> that you can try it yourself -
        play any song on your laptop, then play pink noise on the same device, and after a while the
        pink noise will completely mask the song.
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
        Now, let&apos;s play with some ambient noise you typically hear in public places. To put it
        simply - there are three bands of interest: low rumble (trains, HVAC), mid chatter (people
        talking), and high beeps (notifications, alarms).
      </p>
      <div className="not-prose my-6">
        <NoisyBlock />
      </div>

      <p>
        ANC uses microphones to record the outside world, flips the waveform, and plays that inverse
        back through your headphones. It&apos;s fantastic at steady low rumble—airplanes, HVAC,
        traffic—but it struggles with speech and sudden clinks where the waveform changes faster
        than it can react. Those mids and highs are what still poke through.
      </p>

      <p>
        The other day I was trying to read a contract in a noisy place. I put my AirPods into noise
        cancellation mode and waited for the world to disappear. It didn&apos;t. The low rumble went
        away, but random voices and clinks still slipped through and kept tugging on my attention.
      </p>

      <p>
        ANC is very good at steady low-frequency noise, less so at speech and sudden sounds. What I
        really wanted wasn&apos;t more cancellation, but a more stable background. So I tried
        something simple: kept ANC on, then added a low layer of noise underneath to cover the
        leftovers. Because ANC already tames the room, that extra layer can stay whisper-quiet and
        still do the masking.
      </p>

      <Heading level={2}>Add the real-world noise</Heading>

      <Heading level={2}>Bring in ANC</Heading>
      <p>
        Slide ANC intensity to watch the left side of the spectrum collapse while the voice hump
        stays stubborn. This is why voices feel louder once the low rumble is gone.
      </p>
      <div className="not-prose my-6">
        <AncBlock />
      </div>

      <Heading level={2}>Mask with pink noise</Heading>
      <p>
        Pink noise blankets everything evenly. Without ANC you need to turn it up to hide
        chatter—see how the floor lifts as you raise the slider.
      </p>
      <div className="not-prose my-6">
        <PinkNoiseBlock />
      </div>

      <Heading level={2}>Stack both</Heading>
      <p>
        Now pair full ANC with just a whisper of pink noise. With the low-end already cancelled,
        even a 30–40% layer can smother the remaining speech peaks.
      </p>
      <div className="not-prose my-6">
        <ComboBlock />
      </div>

      <Heading level={2}>Try it for real</Heading>
      <p>
        I liked the effect enough that I turned it into a tiny web tool:{' '}
        <Link href="/tools/focus-noise-box">Focus Noise Box</Link>. It plays white, pink, or brown
        noise tuned to sit under ANC so nearby chatter blends away instead of breaking your focus.
      </p>

      <p>Put on your ANC headphones, add a whisper of pink noise, and watch the chaos fade.</p>
    </ArticleLayout>
  );
}
