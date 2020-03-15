import {Avatar, List} from 'antd';
import Layout from '../components/Layout';
import data from '../helpers/learning-materials-data';

export default () => (
  <Layout
    title="Learning Materials about back-end and startups"
    ogTags={[
      <meta property="og:title" content="Learning Materials about back-end and startups" />,
      <meta property="og:type" content="website" />,
      <meta property="og:url" content="https://vladholubiev.com/learning-materials/" />,
      <meta
        property="og:description"
        content="Books, e-mail newsletters, videos, online resources"
      />,
      <meta
        property="og:image"
        content="https://vladholubiev.com/static/og-images/learning-materials-1200x630.png"
      />,
      <meta
        property="og:image:secure_url"
        content="https://vladholubiev.com/static/og-images/learning-materials-1200x630.png"
      />,
      <meta property="og:image:type" content="image/png" />,
      <meta property="og:image:width" content="1200" />,
      <meta property="og:image:height" content="630" />,
      <meta
        property="og:image:alt"
        content="Learning Materials: Which I recommend to developers who apply for a Back-end Developer role at Shelf"
      />
    ]}
  >
    <header>
      <h2>Learning Materials</h2>
    </header>

    <section>
      {/*language=CSS*/}
      <style jsx>{`
        .list-item__wrapper.ant-list-item-meta-avatar {
          flex-grow: 1;
        }
      `}</style>

      <List
        header={'In no particular order. About back-end and startups'}
        itemLayout="horizontal"
        dataSource={data}
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
                  <a href={item.link} target="_blank">
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
  </Layout>
);
