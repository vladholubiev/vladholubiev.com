import React from 'react';
import Layout from '../components/Layout';
import ExternalLink from '../components/ExternalLink';

export default () => (
  <Layout>
    {/*language=CSS*/}
    <style jsx>{`
      header {
        font-size: 1.75em;
        margin: 1em 0;
        max-width: 100%;
        text-align: center;
      }
    `}</style>

    <header>
      <h1 style={{fontWeight: 600, marginBottom: '.25em'}}>
        Vlad <span style={{color: '#ff5252'}}>Holubiev</span>
      </h1>

      <p>Software Engineer</p>
    </header>

    <section>
      <h2>Hello</h2>

      <p>
        I enjoy building hip back-end tech like Serverless λ with Node.js, Microservices in Docker,
        REST APIs on AWS, IaaC with Terraform, Elasticsearch with MongoDB, TDD with Wallaby.
      </p>

      <p>
        Find me on the web: &nbsp;
        <ExternalLink url={'https://twitter.com/vladholubiev'} text={'Twitter'} />
        <span>, </span>
        <ExternalLink url={'https://medium.com/@vladholubiev'} text={'Medium'} />
        <span>, </span>
        <ExternalLink url={'https://github.com/vladgolubev'} text={'GitHub'} />
        <span>, </span>
        <ExternalLink url={'https://linkedin.com/in/vlad-holubiev'} text={'LinkedIn'} />
      </p>

      <p>
        Or drop me a line at <a href={'mailto:hello@vladholubiev.com'}>hello@vladholubiev.com</a>
      </p>
    </section>
  </Layout>
);
