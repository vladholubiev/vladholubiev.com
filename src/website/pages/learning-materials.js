import {List, Avatar} from 'antd';
import Layout from '../components/Layout';

const data = [
  {
    title: 'JavaScript Weekly',
    link: 'http://javascriptweekly.com/',
    description: 'Weekly e-mail round-up of JavaScript news and articles',
    iconURL: 'https://hsto.org/webt/59/cc/76/59cc7600c78a2239379574.jpeg'
  },
  {
    title: 'Serverless Status',
    link: 'https://serverless.email/',
    description:
      'A weekly newsletter about serverless architectures and paradigms, function-as-a-service, AWS Lambda, etc.',
    iconURL: 'https://serverless.email/images/serverlesskeith.png'
  }
];

export default () => (
  <Layout>
    <header>
      <h2>Learning Materials</h2>

      <p>Which I recommend to developers who apply for a Back-end Developer role at Shelf</p>
    </header>

    <section>
      {/*language=CSS*/}
      <style jsx>{`
        .list-item__wrapper.ant-list-item-meta-avatar {
          flex-grow: 1;
        }
      `}</style>

      <List
        header={'In no particular order'}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div className="list-item__wrapper">
              <List.Item.Meta
                avatar={<Avatar shape="square" src={item.iconURL} />}
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
