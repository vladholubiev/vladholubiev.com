import React from 'react';
import Head from 'next/head';

export default () =>
  <div>
    <Head>
      <meta charSet="utf-8"/>

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108459948-1"/>
      <script>{() => {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-108459948-1');
      }}</script>

      <meta name="author" content="Vladyslav Holubiev"/>
      <meta name="description" content="TBD"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm.min.css"/>
      <title>Vlad Holubiev</title>
    </Head>

    {/*language=CSS*/}
    <style jsx>{`
        header {
            font-size: 2em;
            margin: 4em 0;
            max-width: 100%;
            text-align: center;
        }

        nav {
            background: white;
            margin: -1em auto 2.5em auto;
            max-width: 40rem;
            padding: 1em 0;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 1;
        }
    `}</style>

    <header>
      <h1>Vlad <span>Holubiev</span></h1>

      <p>Software Engineer</p>
    </header>

    <nav>
      <ul>
        <li>
          <a href="https://twitter.com/vladholubiev" target="_blank">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://medium.com/@vladholubiev" target="_blank">
            Medium
          </a>
        </li>
        <li>
          <a href="https://stackoverflow.com/users/2727317/vlad-holubiev?tab=profile"
             target="_blank">
            StackOverflow
          </a>
        </li>
        <li>
          <a href="https://github.com/vladgolubev" target="_blank">
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </div>
