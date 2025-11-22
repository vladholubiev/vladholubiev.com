import type {Metadata} from 'next';
import {ArticleLayout} from '@/components/ArticleLayout';
import {ResponsibleIllustration} from '@/components/illustrators/ResponsibleIllustration';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-10-13',
  title: 'Default to Responsible',
  description: '',
  readingTime: '1 min read',
};

export const metadata: Metadata = {
  title: `${meta.title} - Vlad Holubiev`,
  description: meta.description || meta.title,
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        In high-stakes engineering environments, I’ve found that the healthiest team cultures
        embrace a counterintuitive mindset: when something goes wrong, default to assuming you might
        have caused it until proven otherwise.
      </p>

      <p>
        This isn’t about blame — it’s about responsibility. Instead of saying “It’s probably someone
        else’s change,” you ask, “Could it have been mine?”
      </p>

      <p>
        This mindset feels disarming at first. It strips away defensiveness and accelerates
        problem-solving. People quickly mobilize around the issue rather than around self-defense.
      </p>

      <p>
        It’s not about being blameless — it’s about being responsible. It’s a cultural habit worth
        building.
      </p>

      <ResponsibleIllustration
        role="img"
        aria-label="Default to Responsible illustration"
        focusable="false"
        className="rounded-3xl overflow-hidden"
      />
    </ArticleLayout>
  );
}
