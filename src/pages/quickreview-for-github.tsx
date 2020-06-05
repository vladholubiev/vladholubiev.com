import React from 'react';
import {Button, Carousel, Divider, Typography} from 'antd';
import Head from 'next/head';
import {ChromeFilled, GithubOutlined} from '@ant-design/icons';
import {trackSocialClick} from '../gtag';

const {Paragraph} = Typography;

export default () => (
  <div className="max-width900">
    <Head>
      <meta key={'og:title'} property="og:title" content="QuickReview for GitHub" />
      <meta
        key={'og:description'}
        property="og:description"
        content="Shortcuts for GitHub PR reviews"
      />
      <meta
        key={'og:image'}
        property="og:image"
        content="https://vladholubiev.com/static/og-images/quickreview-for-github/large-promo-tile.png"
      />
      <meta
        key={'og:image:secure_url'}
        property="og:image:secure_url"
        content="https://vladholubiev.com/static/og-images/quickreview-for-github/large-promo-tile.png"
      />
      <meta key={'og:image:type'} property="og:image:type" content="image/png" />
      <meta key={'og:image:width'} property="og:image:width" content="920" />
      <meta key={'og:image:height'} property="og:image:height" content="680" />
      <meta
        key={'og:image:alt'}
        property="og:image:alt"
        content="Shortcuts for GitHub PR reviews"
      />
      <title>QuickReview for GitHub</title>
    </Head>
    <h1>QuickReview for GitHub</h1>
    <p>Reviewing 50+ Pull Requests a day is no fun. Automate it with keyboard shortcuts. </p>
    <Divider>
      <a
        href="https://chrome.google.com/webstore/detail/quick-review-for-github/phbjldbcohafhmephgklhbleplhchofm?ref=website"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          href="https://chrome.google.com/webstore/detail/quick-review-for-github/phbjldbcohafhmephgklhbleplhchofm"
          type="primary"
          target="_blank"
          htmlType="button"
          onClick={() => trackSocialClick('GitHub')}
        >
          <ChromeFilled />
          Install for Google Chrome &rarr;
        </Button>
      </a>
    </Divider>

    <Carousel autoplay>
      <div>
        <img
          alt="Press V to mark files as viewed"
          src="https://i.imgur.com/bqzdrYb.png"
          style={{width: '100%'}}
        />
      </div>
      <div>
        <img
          alt="Press a to approve PRs"
          src="https://i.imgur.com/l740IhM.png"
          style={{width: '100%'}}
        />
      </div>
      <div>
        <img
          alt="Press M to merge PRs"
          src="https://i.imgur.com/ArpJQXz.png"
          style={{width: '100%'}}
        />
      </div>
    </Carousel>
    <Paragraph>
      <br />
      <a
        href="https://github.com/vladgolubev/quickreview-for-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubOutlined />
        &nbsp;Source Code
      </a>
    </Paragraph>
  </div>
);
