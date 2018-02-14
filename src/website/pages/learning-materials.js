import {Avatar, List} from 'antd';
import Layout from '../components/Layout';

const data = [
  {
    title: 'JavaScript Weekly',
    link: 'http://javascriptweekly.com/',
    description: 'Weekly e-mail round-up of JavaScript news and articles',
    iconURL: 'https://hsto.org/webt/59/cc/76/59cc7600c78a2239379574.jpeg',
    icon: 'JS'
  },
  {
    title: 'Serverless Status',
    link: 'https://serverless.email/',
    description:
      'A weekly newsletter about serverless architectures and paradigms, function-as-a-service, AWS Lambda, etc.',
    icon: 'ƛ'
  },
  {
    title: 'Node Weekly',
    link: 'https://nodeweekly.com',
    description: 'Weekly e-mail round-up of Node.js news and articles.',
    icon: 'NODE'
  },
  {
    title: 'Anti Patterns Catalog',
    link: 'http://wiki.c2.com/?AntiPatternsCatalog',
    description: '139 classical Anti Patterns',
    icon: 'X'
  },
  {
    title: 'Startup Resources',
    link: 'https://www.hello-startup.net/resources',
    description: `List of tools, links, and checklists to help you build a startup. Based on the book "Hello, Startup: A Programmer's Guide to Building Products, Technologies, and Teams" by Yevgeniy Brikman.`,
    icon: 'S'
  },
  {
    title: '97 Things Every Programmer Should Know',
    link:
      'https://97-things-every-x-should-know.gitbooks.io/97-things-every-programmer-should-know/content/en/index.html',
    description: 'Pearls of wisdom for programmers collected from leading practitioners.',
    icon: '97'
  },
  {
    title: '97 Things Every Software Architect Should Know',
    link:
      'https://manohars.files.wordpress.com/2009/11/97-things-every-software-architect-should-know.pdf\n',
    description: 'Similar to above, but more meta-level',
    icon: '97'
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
                avatar={<Avatar shape="square">{item.icon}</Avatar>}
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
