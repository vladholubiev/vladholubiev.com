import React from 'react';
import {Button, Carousel, Divider, Icon, Typography} from 'antd';
import Layout from '../../components/Layout';
import {trackSocialClick} from '../../helpers/gtag';

const {Paragraph} = Typography;

export default () => (
  <Layout>
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
