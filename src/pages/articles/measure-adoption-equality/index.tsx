import {ArticleLayout} from '@/components/ArticleLayout';
import Image from 'next/image';
import image01 from './image-01.jpeg';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-07-09',
  title: 'Measure Adoption Equality, Not Just Totals',
  description: '',
  readingTime: '2 min read',
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        When you bring new AI tools into an engineering team, totals can deceive you. Vendor
        dashboards love celebrating the aggregate number of prompts or active hours, but those
        figures often reflect a few early enthusiasts, not broad adoption.
      </p>

      <p>
        If the goal is meaningful change rather than vanity metrics, you need to gauge equality. The
        Lorenz curve, familiar to economists, works just as well for product rollouts: plot the
        cumulative usage on the Y-axis against the cumulative number of users on the X-axis, sorted
        from the most to the least active.
      </p>

      <ul>
        <li>
          <strong>A straight diagonal</strong> signals even participation where every engineer uses
          the tool similarly.
        </li>
        <li>
          <strong>A steep curve</strong> reveals concentration, with a handful of power users
          carrying the totals while most colleagues stay on the sidelines.
        </li>
      </ul>

      <Image src={image01} alt="" />

      <p>
        Our first internal rollout produced that steep curve. A few engineers embraced the assistant
        immediately, inflating the totals, while the majority barely touched it. Without the Lorenz
        view we could have misread those early totals as proof of success.
      </p>

      <p>
        Month after month we focused on flattening the line: better onboarding, clearer patterns,
        internal demos, and targeted coaching. As the curve straightened, we finally saw the tool
        spreading beyond the loudest advocates.
      </p>

      <p>
        Adoption is meaningful only when the whole team participates. Track equality, not just
        enthusiasm.
      </p>
    </ArticleLayout>
  );
}
