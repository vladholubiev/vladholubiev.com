import Layout from '../components/Layout';
import {trackSocialClick} from '../helpers/gtag';

export default () =>
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
      <h1 style={{fontWeight: 600, marginBottom: '.25em'}}>Vlad <span style={{color: '#ff5252'}}>Holubiev</span>
      </h1>

      <p>Software Engineer</p>
    </header>

    <section>
      <h2>Hello</h2>

      <p>
        I enjoy building hip back-end tech like
        Serverless λ with Node.js, Microservices in Docker, REST APIs on AWS,
        IaaC with Terraform, Elasticsearch with MongoDB, TDD with Wallaby.
      </p>

      <p>
        Find me on the web: &nbsp;

        <span onClick={() => trackSocialClick('Twitter')}>
          <a href="https://twitter.com/vladholubiev" target="_blank">
            Twitter
          </a>
        </span>

        <span>, </span>

        <span onClick={() => trackSocialClick('Medium')}>
          <a href="https://medium.com/@vladholubiev" target="_blank">
            Medium
          </a>
        </span>

        <span>, </span>

        <span onClick={() => trackSocialClick('GitHub')}>
          <a href="https://github.com/vladgolubev" target="_blank">
            GitHub
          </a>
        </span>

        <span>, </span>

        <span onClick={() => trackSocialClick('LinkedIn')}>
          <a href="https://linkedin.com/in/vlad-holubiev" target="_blank">
            LinkedIn
          </a>
        </span>
      </p>
    </section>

  </Layout>
