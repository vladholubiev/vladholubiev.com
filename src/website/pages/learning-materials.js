import {List, Avatar} from 'antd';
import Layout from '../components/Layout';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
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
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </div>
          </List.Item>
        )}
      />
    </section>
  </Layout>
);
