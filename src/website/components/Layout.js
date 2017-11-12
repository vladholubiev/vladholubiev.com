import Head from 'next/head';
import {Layout, LocaleProvider, Menu} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Link from 'next/link'

const {Header, Content, Footer} = Layout;

export default ({children, title = 'Vlad Holubiev'}) =>
  <div>
    <Head>
      <meta charSet="utf-8"/>

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108459948-1"/>
      <script dangerouslySetInnerHTML={{
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
      }}/>

      <meta name="author" content="Vladyslav Holubiev"/>
      <meta name="description"
            content="I enjoy building hip back-end tech like Serverless λ with Node.js, Microservices in Docker, REST APIs on AWS, IaaC with Terraform, Elasticsearch with MongoDB, TDD with Wallaby."/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>

      <link rel="stylesheet"
            href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.0.0-beta.6/antd.min.css'/>

      <link rel="apple-touch-icon-precomposed" href="/static/favicon-256.png"/>
      <meta name="msapplication-TileColor" content="#FFFFFF"/>
      <meta name="msapplication-TileImage" content="/static/favicon-256.png"/>
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon-256.png"/>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon-256.png"/>

      <title>{title}</title>

      {/*language=CSS*/}
      <style jsx global>{`
          body {
              background: rgb(240, 242, 245);
              font-size: 1.1em;
          }
      `}</style>
    </Head>

    <LocaleProvider locale={enUS}>
      <Layout className="layout" style={{height: '100%'}}>
        <Header style={{background: 'white'}}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="/"><Link href="/">🏠 Home</Link></Menu.Item>
            <Menu.Item key="/serverless-libreoffice"><Link href="/serverless-libreoffice">⚡️Serverless LibreOffice</Link></Menu.Item>
          </Menu>
        </Header>

        <Content style={{margin: '24px auto', padding: 24, height: '100%', maxWidth: 900, width: '100%'}}>
          <div style={{background: '#fff', padding: 48, minHeight: 280}}>
            {children}
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </LocaleProvider>
  </div>
