import {ArticleLayout} from '@/components/ArticleLayout';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-10-16',
  title: "Teach, Don't Correct",
  description:
    "Defuse technical debates by sharing context and curiosity instead of nitpicking someone else's wording.",
  readingTime: '2 min read',
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Early in my engineering career, I saw many technical discussions stall out - not because the
        solutions were complex, but because the communication subtly suggested someone was foolish.
        Engineers have a habit of quickly calling out what's impossible, impractical, or
        inefficient. Technically right, perhaps, but tactically disastrous.
      </p>

      <p>
        When stakeholders or peers propose ideas that won't work, the instinctive reaction is often
        to correct. "That won't scale," "It's technically infeasible," or "You're misunderstanding
        the limitations." These responses seem straightforward and honest, but they unintentionally
        diminish others, framing conversations as competitions of competence.
      </p>

      <p>
        The better path isn't correction - it's education. Don't just say why something is
        impossible; illuminate how similar challenges have been solved before. Share your own past
        mistakes openly, demonstrating how learning through experience is natural. This approach
        doesn't just soften your critique; it empowers the listener,{' '}
        <span className="marker">making them smarter, not smaller.</span>
      </p>

      <p>
        The engineer who consistently makes others feel wiser becomes indispensable. Your insights
        aren't merely accurate - they become a valued source of growth. Invitations to strategic
        discussions multiply because your presence lifts everyone's understanding.
      </p>

      <p>
        Mastering technology is table stakes. Mastering the subtle art of teaching rather than
        correcting is what truly defines exceptional engineers.
      </p>
    </ArticleLayout>
  );
}
