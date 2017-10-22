import Head from 'next/head';
import Footer from './Footer';

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

        gtag('js', new Date());
        gtag('config', 'UA-108459948-1');
        `
      }}/>

      <meta name="author" content="Vladyslav Holubiev"/>
      <meta name="description" content="TBD"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>

      <link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm.min.css"/>

      <link rel="apple-touch-icon-precomposed" href="/static/favicon-256.png"/>
      <meta name="msapplication-TileColor" content="#FFFFFF"/>
      <meta name="msapplication-TileImage" content="/static/favicon-256.png"/>
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon-256.png"/>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon-256.png"/>

      <title>{title}</title>
    </Head>

    <main>
      {children}
    </main>

    <Footer/>
  </div>
