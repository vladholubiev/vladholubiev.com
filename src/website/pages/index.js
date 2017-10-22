import Head from 'next/head';
import App from '../components/App';

export default () =>
  <div>
    <Head>
      <meta charset="utf-8"/>
      <meta name="author" content="Vladyslav Holubiev"/>
      <meta name="description" content="TBD"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm.min.css"/>
      <title>Vlad Holubiev</title>
    </Head>
    <App/>
  </div>
