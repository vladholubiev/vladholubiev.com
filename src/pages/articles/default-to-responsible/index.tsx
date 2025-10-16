import {ArticleLayout} from '@/components/ArticleLayout';
import Image from 'next/image';
import image01 from './image-01.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-10-13',
  title: 'Default to Responsible',
  description: '',
  readingTime: '1 min read',
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        In high-stakes engineering environments, I&apos;ve found that the healthiest team cultures
        embrace a counterintuitive mindset: when something goes wrong, default to assuming you might
        have caused it until proven otherwise.
      </p>

      <p>
        This isn&apos;t about blame - it&apos;s about responsibility. Instead of saying
        &quot;It&apos;s probably someone else&apos;s change,&quot; you ask, &quot;Could it have been
        mine?&quot;
      </p>

      <p>
        This mindset feels disarming at first. It strips away defensiveness and accelerates
        problem-solving. People quickly mobilize around the issue rather than around self-defense.
      </p>

      <p>
        It&apos;s not about being blameless - it&apos;s about being responsible. It&apos;s a
        cultural habit worth building.
      </p>

      <Image src={image01} alt="" />
    </ArticleLayout>
  );
}
