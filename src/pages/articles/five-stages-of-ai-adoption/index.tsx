import {ArticleLayout} from '@/components/ArticleLayout';
import Image from 'next/image';
import image01 from './image-01.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2025-07-02',
  title: 'The Five Stages of AI Adoption',
  description: '',
  readingTime: '2 min read',
  mediumUrl: 'https://medium.com/shelf-io-engineering/five-stages-of-ai-adoption-993d8bebbf47',
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        When engineering teams face disruptive tech, emotions often mirror the classic five stages
        of grief: denial, anger, bargaining, depression, acceptance.
      </p>

      <p>
        <strong>Denial</strong> kicks in first. Engineers dismissed GPT-2 as a joke because it
        couldn't replace human-level tasks. This skepticism wasn't logic - it was self-preservation.
      </p>

      <p>
        Next comes <strong>anger</strong>, disguised as practical objections. "The code it generates
        is messy," or "It needs constant oversight." Valid criticisms, sure - but temporary. Soon
        the tool improves, and arguments fade.
      </p>

      <p>
        Then engineers start <strong>bargaining</strong>. They let AI handle basic work, fiercely
        holding onto complex tasks. But soon, complexity isn't safe either, and they begin losing
        ground to increasingly capable AI. The line between what's yours and what's the AI's gets
        blurry.
      </p>

      <p>
        Quietly, <strong>depression</strong> sets in. It surfaces as apathy. Engineers who once
        eagerly explored new tools now settle for what's good enough. Behind this lies the
        uncomfortable realization: AI does some of what you once valued, maybe even better.
      </p>

      <p>
        Finally, <strong>acceptance</strong> arrives. The team adapts - not begrudgingly, but
        practically. AI isn't the enemy; it's a collaborator. Acceptance doesn't mean giving up - it
        means seeing clearly. Roles shift from pure creation to critical refinement. Engineers
        become directors of solutions rather than authors of code.
      </p>

      <Image src={image01} alt="" />

      <p>
        We should anticipate these stages, guide teams through emotional turbulence, and acknowledge
        the real loss people feel when cherished skills become less relevant. The reward? A team
        ready to leverage AI's potential instead of fighting it.
      </p>

      <p>
        Adopting AI isn't just about technology. It's about navigating emotional resistance.
        Recognize the stages, address them head-on, and your team won't just survive - they'll
        thrive.
      </p>
    </ArticleLayout>
  );
}
