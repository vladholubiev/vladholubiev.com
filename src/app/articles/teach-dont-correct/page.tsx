import type {Metadata} from 'next';
import {ArticleLayout} from '@/components/ArticleLayout';
import {TeachIllustration} from '@/components/illustrators/TeachIllustration';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-10-16',
  title: "Teach, Don't Correct",
  description:
    "Defuse technical debates by sharing context and curiosity instead of nitpicking someone else's wording.",
  readingTime: '2 min read',
};

export const metadata: Metadata = {
  title: `${meta.title} - Vlad Holubiev`,
  description: meta.description || meta.title,
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Early in my engineering career, I saw many technical discussions stall out - not because the
        solutions were complex, but because the communication subtly suggested someone was foolish.
        Engineers have a habit of quickly calling out what&apos;s impossible, impractical, or
        inefficient. Technically right, perhaps, but tactically disastrous.
      </p>

      <p>
        When stakeholders or peers propose ideas that won&apos;t work, the instinctive reaction is
        often to correct. &ldquo;That won&apos;t scale,&rdquo; &ldquo;It&apos;s technically
        infeasible,&rdquo; or &ldquo;You&apos;re misunderstanding the limitations.&rdquo; These
        responses seem straightforward and honest, but they unintentionally diminish others, framing
        conversations as competitions of competence.
      </p>

      <p>
        The better path isn&apos;t correction - it&apos;s education. Don&apos;t just say why
        something is impossible; illuminate how similar challenges have been solved before. Share
        your own past mistakes openly, demonstrating how learning through experience is natural.
        This approach doesn&apos;t just soften your critique; it empowers the listener,{' '}
        <span className="marker">making them smarter, not smaller.</span>
      </p>

      <p>
        The engineer who consistently makes others feel wiser becomes indispensable. Your insights
        aren&apos;t merely accurate - they become a valued source of growth. Invitations to
        strategic discussions multiply because your presence lifts everyone&apos;s understanding.
      </p>

      <p>
        Mastering technology is table stakes. Mastering the subtle art of teaching rather than
        correcting is what truly defines exceptional engineers.
      </p>

      <TeachIllustration
        role="img"
        aria-label="A hand noting that teaching empowers people instead of correcting them."
        focusable="false"
        className="rounded-3xl overflow-hidden"
      />
    </ArticleLayout>
  );
}
