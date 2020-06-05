import React from 'react';
import {Avatar, List} from 'antd';
import Head from 'next/head';
import {newsletters, other} from '../../helpers/learning-materials-data';

export default () => (
  <>
    <Head>
      <title>Learning Materials about back-end and startups</title>
      <meta
        key={'og:title'}
        property="og:title"
        content="Learning Materials about back-end and startups"
      />
      <meta key={'og:type'} property="og:type" content="website" />,
      <meta
        key={'og:url'}
        property="og:url"
        content="https://vladholubiev.com/learning-materials/"
      />
      <meta
        key={'og:description'}
        property="og:description"
        content="Books, e-mail newsletters, videos, online resources"
      />
      <meta
        key={'og:image'}
        property="og:image"
        content="https://vladholubiev.com/static/og-images/learning-materials-1200x630.png"
      />
      <meta
        key={'og:image:secure_url'}
        property="og:image:secure_url"
        content="https://vladholubiev.com/static/og-images/learning-materials-1200x630.png"
      />
      <meta key={'og:image:type'} property="og:image:type" content="image/png" />
      <meta key={'og:image:width'} property="og:image:width" content="1200" />
      <meta key={'og:image:height'} property="og:image:height" content="630" />
      <meta
        key={'og:image:alt'}
        property="og:image:alt"
        content="Learning Materials: Which I recommend to developers who apply for a Back-end Developer role at Shelf"
      />
    </Head>
    <header>
      <h1>Learning Materials</h1>
    </header>

    <section>
      {/*language=CSS*/}
      <style jsx>{`
        .list-item__wrapper.ant-list-item-meta-avatar {
          flex-grow: 1;
        }
      `}</style>

      <List
        header={'Weekly email newsletters'}
        itemLayout="horizontal"
        dataSource={newsletters}
        renderItem={item => (
          <List.Item>
            <div className="list-item__wrapper">
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    style={{backgroundColor: item.bgColor, color: item.fgColor || 'white'}}
                    shape="square"
                  >
                    {item.icon}
                  </Avatar>
                }
                title={
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                }
                description={item.description}
              />
            </div>
          </List.Item>
        )}
      />
      <List
        header={'Other'}
        itemLayout="horizontal"
        dataSource={other}
        renderItem={item => (
          <List.Item>
            <div className="list-item__wrapper">
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    style={{backgroundColor: item.bgColor, color: item.fgColor || 'white'}}
                    shape="square"
                  >
                    {item.icon}
                  </Avatar>
                }
                title={
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                }
                description={item.description}
              />
            </div>
          </List.Item>
        )}
      />
    </section>
  </>
);
