import type {Metadata} from 'next';
import {ArticleLayout} from '@/components/ArticleLayout';
import {Heading} from '@/components/Heading';
import {CodeBlock} from '@/components/CodeBlock';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2022-11-10',
  title: 'Running LibreOffice In AWS Lambda: 2022 Edition, Open-Sourced',
  description: `Learn about the latest updates to my most popular GitHub project.`,
  readingTime: '4 min read',
  mediumUrl:
    'https://medium.com/shelf-io-engineering/running-libreoffice-in-aws-lambda-2022-edition-open-sourced-9bb0028911d8',
};

export const metadata: Metadata = {
  title: `${meta.title} - Vlad Holubiev`,
  description: meta.description || meta.title,
};

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <Heading level={2}>History</Heading>

      <p>
        Exactly 5 years ago, I wrote about{' '}
        <a href="https://medium.com/hackernoon/how-to-run-libreoffice-in-aws-lambda-for-dirty-cheap-pdfs-at-scale-b2c6b3d069b4">
          running LibreOffice in AWS Lambda
        </a>{' '}
        for the first time. It enabled people to generate PDFs from any office file format for a
        fraction of a dollar. As opposed to a traditional server-based approach, it utilizes
        serverless computing to drastically reduce costs and get better stability. Each Lambda
        invocation gets a fresh runtime environment, so users benefit from not having to worry about
        frozen zombie processes or memory leaks.
      </p>

      <p>
        The original approach was based on compiling a LibreOffice build specifically suited for the
        AWS Lambda execution environment (with many Linux libraries missing) and packaging it as a
        Lambda layer. It can be found here:{' '}
        <a href="https://github.com/vladholubiev/serverless-libreoffice">
          https://github.com/vladholubiev/serverless-libreoffice
        </a>
      </p>

      <p>
        Since then, a lot of things changed in the AWS Lambda landscape. Lambda got native Docker
        support, higher memory limits, expandable /tmp space, etc.
      </p>

      <p>The most common problems observed with the original approach were:</p>

      <ul>
        <li>
          Stripped out LibreOffice build lacked many features and supported fewer file formats than
          a standalone desktop build.
        </li>
        <li>No fonts or emoji support.</li>
        <li>
          Limited disk space available for converting large files, since a layer consumed ~50% of
          the /tmp space.
        </li>
        <li>
          A complex process of upgrading to a new version due to constraints of the AWS
          Lambda&apos;s provided environment.
        </li>
      </ul>

      <Heading level={2}>A New Approach Was Born</Heading>

      <p>
        To address those problems, I wrote a new version based on Docker and compiled it with the
        latest LibreOffice 7.4. The setup is a bit more involved, but it&apos;s more flexible,
        easier to maintain, and produces better-quality outputs. Some of the benefits:
      </p>

      <ul>
        <li>
          The size limit of the compiled LibreOffice increased from 512 MB (Lambda layer limitation)
          to <strong>10 GB</strong> — meaning less stuff needs to be stripped out from the
          LibreOffice package. The new base image is 877 MB in size.
        </li>
        <li>
          More repeatable build — by utilizing Docker for the build process, it&apos;s much easier
          to replicate a build locally and upgrade to new LibreOffice versions.
        </li>
        <li>
          Ability to install fonts or other LibreOffice extensions — my base image already includes
          CJK fonts!
        </li>
      </ul>

      <p>The outcome of this is:</p>

      <ul>
        <li>
          a base Docker image, that you can use to package your Lambda function Docker image with
          the latest LibreOffice and its dependencies installed, ready to be used for PDF
          generation.
        </li>
        <li>
          a helper utility node.js library to help invoke LibreOffice commands to do file
          conversion.
        </li>
      </ul>

      <p>
        <strong>Check them out:</strong>
      </p>

      <ul>
        <li>
          <a href="https://github.com/shelfio/libreoffice-lambda-base-image">
            libreoffice-lambda-base-image
          </a>
        </li>
        <li>
          <a href="https://github.com/shelfio/aws-lambda-libreoffice">aws-lambda-libreoffice</a>
        </li>
      </ul>

      <p>
        Bonus tip: by default, Lambda allocates 512 MB of <code>/tmp</code> space for your Lambda.
        When converting larger files, you might need more space. Since March 2022, it&apos;s now
        possible to extend the <code>/tmp</code> space to 10 GB! See the{' '}
        <a href="https://aws.amazon.com/blogs/aws/aws-lambda-now-supports-up-to-10-gb-ephemeral-storage/">
          blog post
        </a>
        .
      </p>

      <Heading level={2}>How to Use It</Heading>

      <p>
        If you are already bundling your Lambdas as Docker images, the setup should be familiar to
        you. If not — check out the{' '}
        <a href="https://docs.aws.amazon.com/lambda/latest/dg/images-create.html">
          AWS Documentation
        </a>{' '}
        on the topic.
      </p>

      <p>
        It starts with adjusting your Dockerfile. By default, when you&apos;re building a Docker
        image for your Lambda, you base it off the official AWS image like this:
      </p>

      <CodeBlock
        language="dockerfile"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`FROM public.ecr.aws/lambda/nodejs:16-x86_64`}
      </CodeBlock>

      <p>
        What you need to do instead, is to change this line to the base image for Node.js 16 with
        LibreOffice:
      </p>

      <CodeBlock
        language="dockerfile"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`FROM public.ecr.aws/shelf/lambda-libreoffice-base:7.4-node16-x86_64`}
      </CodeBlock>

      <p>Next, you finish your Dockefile with the usual bundling steps:</p>

      <CodeBlock
        language="dockerfile"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`COPY handler.js \${LAMBDA_TASK_ROOT}/
CMD [ "handler.handler" ]`}
      </CodeBlock>

      <p>
        I&apos;ll skip the rest of the steps needed, like building the image, pushing it to the ECR
        repository, etc, as it&apos;s out of the scope of this article. You can find tutorials on
        that online, as well as in the{' '}
        <a href="https://docs.aws.amazon.com/lambda/latest/dg/images-create.html">AWS Docs</a>.
      </p>

      <p>
        So now, by changing the base image of your Lambda, you are able to execute LibreOffice
        commands in your Lambda! Here is an example that creates a dummy TXT file and converts it to
        PDF:
      </p>

      <CodeBlock
        language="javascript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >{`const {execSync} = require('child_process');
const {writeFileSync} = require('fs');
module.exports.handler = () => {
  writeFileSync('/tmp/hello.txt', Buffer.from('Hello World!'));
  execSync('cd /tmp && libreoffice7.4 --headless --invisible --nodefault --view --nolockcheck --nologo --norestore --convert-to pdf --outdir /tmp ./hello.txt');
};`}</CodeBlock>

      <p>
        If you want a more high-level API around LibreOffice rather than fiddling with the commands
        like <code>libreoffice7.4 --headless</code>, check out{' '}
        <a href="https://github.com/shelfio/aws-lambda-libreoffice">
          https://github.com/shelfio/aws-lambda-libreoffice
        </a>
        . It provides API like this:
      </p>

      <CodeBlock
        language="javascript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`const {convertTo} = require('@shelf/aws-lambda-libreoffice');
convertTo('document.docx', 'pdf'); // returns /tmp/document.pdf`}
      </CodeBlock>

      <p>
        The library handles specifics of the Lambda environment, like saving files to the only
        writable path <code>/tmp</code> and cleaning up residual files.
      </p>

      <Heading level={2}>Summary</Heading>

      <p>
        Thousands of people used the original 2017 build of LibreOffice for Lambda to run their
        production workloads.
      </p>

      <p>
        And now, there is a new, recommended way of running LibreOffice in AWS Lambda. It utilizes
        Docker instead of Lambda layers. It has the latest LibreOffice version compiled and CJK
        fonts support.
      </p>

      <p>
        Right now, there is a pre-built base image for Node 16 environment, but it could be easily
        extended to support more languages. Pull Requests and contributions are welcome! Check out
        the{' '}
        <a href="https://github.com/shelfio/libreoffice-lambda-base-image/blob/master/Dockerfile.node16-x86_64">
          Dockerfile.node16-x86_64
        </a>{' '}
        as an example for inspiration.
      </p>

      <ul>
        <li>
          <a href="https://github.com/shelfio/libreoffice-lambda-base-image">
            libreoffice-lambda-base-image
          </a>
        </li>
        <li>
          <a href="https://github.com/shelfio/aws-lambda-libreoffice">aws-lambda-libreoffice</a>
        </li>
      </ul>
    </ArticleLayout>
  );
}
