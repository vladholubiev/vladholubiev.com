import {Layout, Menu} from 'antd';
import Link from 'next/link';
import {RocketOutlined, TwitterOutlined} from '@ant-design/icons';
import React from 'react';

export default function () {
  return (
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
          <Menu.Item key="/projects/quickreview-for-github">
            <Link href="/projects/quickreview-for-github">
              <a>QuickReview for GitHub</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/projects/learning-materials">
            <Link href="/projects/learning-materials">
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
