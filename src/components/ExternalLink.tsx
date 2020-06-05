import React from 'react';
import {trackSocialClick} from '../gtag';

export default ({url, text}: {url: string; text: string}) => {
  return (
    <span onClick={() => trackSocialClick(text)}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    </span>
  );
};
