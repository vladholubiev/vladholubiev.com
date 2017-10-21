import Head from 'next/head';
import App from '../components/App';

export default () =>
  <div>
    <Head>
      <title>Vlad Holubiev</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"/>
      <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css"/>
    </Head>
    <App/>
  </div>
