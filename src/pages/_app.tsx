import 'antd/dist/antd.css';
import {ConfigProvider, Layout} from 'antd';
import {AppProps} from 'next/app';
import React from 'react';
import enUS from 'antd/lib/locale-provider/en_US';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import '../styles.css';

const MyApp = function ({Component, pageProps, router}: AppProps) {
  return (
    <ConfigProvider locale={enUS}>
      <Head />
      <Layout>
        <NavBar currentRoute={router.route} />

        <Layout.Content>
          <div className="content-wrapper">
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
