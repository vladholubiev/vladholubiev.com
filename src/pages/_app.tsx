import 'antd/dist/antd.css';
import {ConfigProvider, Layout, Menu} from 'antd';
import {RocketOutlined, TwitterOutlined} from '@ant-design/icons';
import {AppProps} from 'next/app';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import enUS from 'antd/lib/locale-provider/en_US';
import '../styles.css';

const MyApp = function ({Component, pageProps, router}: AppProps) {
  const {title} = pageProps;

  return (
    <ConfigProvider locale={enUS}>
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
        <meta name="author" content="Vladyslav Holubiev" />
        <meta
          name="description"
          content="I enjoy building hip back-end tech like Serverless λ with Node.js, Microservices in Docker, REST APIs on AWS, IaaC with Terraform, Elasticsearch with MongoDB, TDD with Wallaby."
        />
        <meta name="viewport" content="width=900" />

        <link rel="apple-touch-icon-precomposed" href="/static/favicon-256.png" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/static/favicon-256.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon-256.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon-256.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@vladholubiev" />
        <meta name="twitter:creator" content="@vladholubiev" />

        {pageProps?.ogTags}

        <title>{title || 'Vlad Holubiev'}</title>
      </Head>
      <Layout className="layout" style={{height: '100%'}}>
        <Layout.Header style={{background: 'white'}}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['Home']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="Home">
              <Link href="/">
                <a>🏠 Home</a>
              </Link>
            </Menu.Item>

            {/*<Menu.Item key="Serverless LibreOffice">*/}
            {/*  <Link href="/serverless-libreoffice">*/}
            {/*    <a>⚡️ Serverless LibreOffice</a>*/}
            {/*  </Link>*/}
            {/*</Menu.Item>*/}

            <Menu.SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <RocketOutlined />
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
            </Menu.SubMenu>

            <Menu.Item key="Twitter" style={{float: 'right'}}>
              <a href="https://twitter.com/vladholubiev" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined /> Twitter
              </a>
            </Menu.Item>
          </Menu>
        </Layout.Header>

        <Layout.Content
          style={{margin: '24px auto', padding: 24, height: '100%', maxWidth: 900, width: '100%'}}
        >
          <div style={{background: '#fff', padding: 48, minHeight: 280}}>
            <Component {...pageProps} router={router} />
          </div>
        </Layout.Content>

        <Layout.Footer style={{textAlign: 'center'}}>
          {new Date().getFullYear()},{' '}
          <a
            href="https://github.com/vladgolubev/vladholubiev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            sources
          </a>
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MyApp;
