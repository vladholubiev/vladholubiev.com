import {Avatar, List} from 'antd';
import Layout from '../components/Layout';

const data = [
  {
    title: `Hello, Startup: A Programmer's Guide to Building Products, Technologies, and Teams`,
    link: 'https://www.hello-startup.net/',
    description: `This book will teach you how to build products, technologies, and teams in a startup environment.`,
    icon: 'HS',
    bgColor: '#59bb41'
  },
  {
    title: 'Startup Resources',
    link: 'https://www.hello-startup.net/resources',
    description: `List of tools, links, and checklists to help you build a startup. Based on the book above`,
    icon: 'SR',
    bgColor: '#030102'
  },
  {
    title: 'JavaScript Weekly',
    link: 'http://javascriptweekly.com/',
    description: 'Weekly e-mail round-up of JavaScript news and articles',
    iconURL: 'https://hsto.org/webt/59/cc/76/59cc7600c78a2239379574.jpeg',
    icon: 'JS',
    bgColor: '#f0db4f',
    fgColor: 'black'
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
    title: '97 Things Every Programmer Should Know',
    link:
      'https://97-things-every-x-should-know.gitbooks.io/97-things-every-programmer-should-know/content/en/index.html',
    description: 'Pearls of wisdom for programmers collected from leading practitioners',
    icon: '97'
  },
  {
    title: '97 Things Every Software Architect Should Know',
    link:
      'https://manohars.files.wordpress.com/2009/11/97-things-every-software-architect-should-know.pdf',
    description: 'Similar to above, but more meta-level',
    icon: '97'
  },
  {
    title: `The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses`,
    link: 'https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898',
    description:
      'Validated learning, rapid scientific experimentation, shorten product development cycles, measure actual progress without resorting to vanity metrics, and learn what customers really want',
    icon: 'TLS'
  },
  {
    title: `mongoDB Weekly`,
    link: 'https://mongodb.email',
    description: 'Weekly e-mail round-up of MongoDB news and articles.',
    icon: 'MONGO'
  },
  {
    title: `DB Weekly`,
    link: 'https://dbweekly.com',
    description:
      'A weekly round-up of database technology news and articles covering new developments, SQL, NoSQL, document databases, graph databases, and more',
    icon: 'DB'
  },
  {
    title: 'Serverless Blog',
    link: 'https://serverless.com/blog',
    description: 'The blog on serverless & event-driven compute',
    icon: 'SLS'
  },
  {
    title: 'WebOps Weekly',
    link: 'https://webopsweekly.com',
    description: `A weekly newsletter on Web operations, infrastructure, performance, the backend, and tooling, from the browser down to the metal`,
    icon: 'SLS'
  },
  {
    title: 'Last Week in AWS',
    link: 'https://lastweekinaws.com/',
    description: `A weekly roundup of news from Amazon's cloud ecosystem- sprinkled with snark.`,
    icon: 'AWS'
  },
  {
    title: 'Hacker News',
    link: 'https://news.ycombinator.com/',
    description: `¯\\_(ツ)_/¯`,
    icon: 'HN'
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
