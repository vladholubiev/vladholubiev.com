import Head from 'next/head';

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
      <title>{title}</title>
    </Head>

    {children}
  </div>
