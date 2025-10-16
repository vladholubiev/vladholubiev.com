'use client';

import {animate, stagger} from 'motion';
import {useEffect, useRef} from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
}

function splitTextIntoWords(element: HTMLElement) {
  const text = element.textContent || '';
  const words = text.split(' ');

  element.innerHTML = words
    .map(word => `<span class="split-word" style="display: inline-block;">${word}</span>`)
    .join(' ');

  return element.querySelectorAll('.split-word');
}

export function SplitText({children, className}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      containerRef.current.style.visibility = 'visible';

      const words = splitTextIntoWords(containerRef.current);

      animate(
        words,
        {opacity: [0, 1], y: [10, 0]},
        {
          type: 'spring',
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return (
    <h1 className={className} ref={containerRef} style={{visibility: 'hidden'}}>
      {children}
    </h1>
  );
}
