import React from 'react';
import {Button, Carousel, Divider, Icon, Typography} from 'antd';
import Layout from '../../components/Layout';
import {trackSocialClick} from '../../helpers/gtag';

const {Paragraph} = Typography;

export default () => (
  <Layout
    title="QuickReview for GitHub"
    ogTags={[
      <meta key={'og:title'} property="og:title" content="QuickReview for GitHub" />,
      <meta
        key={'og:description'}
        property="og:description"
        content="Shortcuts for GitHub PR reviews"
      />,
      <meta
        key={'og:image'}
        property="og:image"
        content="https://vladholubiev.com/static/og-images/quickreview-for-github/large-promo-tile.png"
      />,
      <meta
        key={'og:image:secure_url'}
        property="og:image:secure_url"
        content="https://vladholubiev.com/static/og-images/quickreview-for-github/large-promo-tile.png"
      />,
      <meta key={'og:image:type'} property="og:image:type" content="image/png" />,
      <meta key={'og:image:width'} property="og:image:width" content="920" />,
      <meta key={'og:image:height'} property="og:image:height" content="680" />,
      <meta
        key={'og:image:alt'}
        property="og:image:alt"
        content="Shortcuts for GitHub PR reviews"
      />
    ]}
  >
    <h1>QuickReview for GitHub</h1>
    <p>Reviewing 50+ Pull Requests a day is no fun. Automate it with keyboard shortcuts. </p>
    <Divider>
      <a
        href="https://chrome.google.com/webstore/detail/quick-review-for-github/phbjldbcohafhmephgklhbleplhchofm?ref=website"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          href="https://chrome.google.com/webstore/detail/quick-review-for-github/phbjldbcohafhmephgklhbleplhchofm?ref=website"
          type="primary"
          target="_blank"
          htmlType="button"
          onClick={() => trackSocialClick('Chrome Web Store')}
        >
          <Icon type="chrome" theme="filled" />
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
        href="https://www.producthunt.com/posts/quickreview-for-github?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-quickreview-for-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=190007&theme=light"
          alt="QuickReview for GitHub - Keyboard shortcuts for Pull Request review | Product Hunt Embed"
          style={{width: '250px', height: '54px', marginBottom: '20px'}}
          width="250px"
          height="54px"
        />
      </a>
      <br />
      <a
        href="https://github.com/vladgolubev/quickreview-for-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="github" />
        &nbsp;Source Code
      </a>
    </Paragraph>
  </Layout>
);
