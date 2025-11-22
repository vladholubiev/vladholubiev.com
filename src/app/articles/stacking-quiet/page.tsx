import Link from 'next/link';

import {ArticleLayout} from '@/components/ArticleLayout';
import {buildArticleMetadata} from '@/lib/seo';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-11-21',
  title: 'Stacking quiet',
  description: 'Layer ANC with a whisper of noise.',
  readingTime: '2 min read',
};

const slug = 'stacking-quiet';

export const metadata = buildArticleMetadata({
  title: meta.title,
  description: meta.description,
  date: meta.date,
  slug,
});

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        The other day I was trying to read a contract in a noisy place. I put my AirPods into noise
        cancellation mode and waited for the world to disappear. It didn&apos;t. The low rumble went
        away, but random voices and clinks still slipped through and kept tugging on my attention.
      </p>

      <p>
        ANC is very good at steady low-frequency noise, less so at speech and sudden sounds. What I
        really wanted wasn&apos;t more cancellation, but a more stable background. So I tried
        something simple: kept ANC on, then added a low layer of noise underneath to cover the
        leftovers.
      </p>

      <p>
        Because ANC is already reducing the ambient sound, that extra noise can be surprisingly
        quiet. It doesn&apos;t feel like blasting white noise into your ears. It just turns the
        chaotic background into something even and ignorable.
      </p>

      <p>
        I liked the effect enough that I turned it into a tiny web tool:{' '}
        <Link href="/tools/focus-noise-box">Focus Noise Box</Link>. It&apos;s a small noise box for
        your browser that plays white, pink, or brown noise, tuned to sit under ANC so nearby
        chatter blends away instead of breaking your focus.
      </p>

      <p>Feel free to try this layering yourself!</p>
    </ArticleLayout>
  );
}
