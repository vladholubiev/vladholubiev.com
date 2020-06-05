import {Layout, Menu} from 'antd';
import Link from 'next/link';
import {RocketOutlined, TwitterOutlined} from '@ant-design/icons';
import React from 'react';

export default function ({currentRoute}: {currentRoute: string}) {
  return (
    <Layout.Header style={{background: 'white'}}>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={[currentRoute]}
        style={{lineHeight: '64px'}}
      >
        <Menu.Item key="/">
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
          <Menu.Item key="/quickreview-for-github">
            <Link href="/quickreview-for-github">
              <a>QuickReview for GitHub</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/learning-materials">
            <Link href="/learning-materials">
              <a>Learning Materials</a>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="Twitter" style={{float: 'right'}}>
          <a href="https://twitter.com/vladholubiev" target="_blank" rel="noopener noreferrer">
            <TwitterOutlined /> Twitter
          </a>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
