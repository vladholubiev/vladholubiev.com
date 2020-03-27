import React from 'react';
import Head from 'next/head';
import {ConfigProvider, Icon, Layout, Menu} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'next/link';
import {trackLinkClick} from '../helpers/gtag';
import './Layout.css';

const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;

export default ({
  children,
  title = 'Vlad Holubiev',
  ogTags
}: {
  children: any;
  title?: string;
  ogTags?: any[];
}) => (
  <div>
    <Head>
      <meta charSet="utf-8" />

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108459948-1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          dataLayer.push(arguments);
        }

        if (window.location.hostname !== 'localhost') {
          gtag('js', new Date());
          gtag('config', 'UA-108459948-1');
        }
        `
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        if (window.location.hostname !== 'localhost') {
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:687595,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        }
        `
        }}
      />

      <meta name="author" content="Vladyslav Holubiev" />
      <meta
        name="description"
        content="I enjoy building hip back-end tech like Serverless λ with Node.js, Microservices in Docker, REST APIs on AWS, IaaC with Terraform, Elasticsearch with MongoDB, TDD with Wallaby."
      />
      <meta name="viewport" content="width=900" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.min.css"
      />

      <link rel="apple-touch-icon-precomposed" href="/static/favicon-256.png" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="/static/favicon-256.png" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon-256.png" />
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon-256.png" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@vladholubiev" />
      <meta name="twitter:creator" content="@vladholubiev" />

      {ogTags}

      <title>{title}</title>
    </Head>

    <ConfigProvider locale={enUS}>
      <Layout className="layout" style={{height: '100%'}}>
        <Header style={{background: 'white'}}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{lineHeight: '64px'}}
            onClick={key => trackLinkClick('navigation', key)}
          >
            <Menu.Item key="Home">
              <Link href="/">
                <a>🏠 Home</a>
              </Link>
            </Menu.Item>

            <Menu.Item key="Serverless LibreOffice">
              <Link href="/serverless-libreoffice">
                <a>⚡️ Serverless LibreOffice</a>
              </Link>
            </Menu.Item>

            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="project" />
                  Projects
                </span>
              }
            >
              <Menu.ItemGroup title="Chrome Extensions">
                <Menu.Item key="quickreview">
                  <Link href="/projects/quickreview-for-github">
                    <a>QuickReview for GitHub</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Other">
                <Menu.Item key="Useful Stuff">
                  <Link href="/projects/webstorm-live-templates-for-jest">
                    <a>WebStorm Live Templates for Jest</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Learning Materials">
                  <Link href="/projects/learning-materials">
                    <a>Learning Materials</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="Twitter" style={{float: 'right'}}>
              <a href="https://twitter.com/vladholubiev" target="_blank" rel="noopener noreferrer">
                <Icon type="twitter" /> Twitter
              </a>
            </Menu.Item>
          </Menu>
        </Header>

        <Content
          style={{margin: '24px auto', padding: 24, height: '100%', maxWidth: 900, width: '100%'}}
        >
          <div style={{background: '#fff', padding: 48, minHeight: 280}}>{children}</div>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          {new Date().getFullYear()},{' '}
          <a
            href="https://github.com/vladgolubev/vladholubiev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            sources
          </a>
        </Footer>
      </Layout>
    </ConfigProvider>
  </div>
);
