import Layout from '../components/Layout';
import React from 'react'
import Head from 'next/head';
import {trackLinkClick, trackSocialClick} from '../helpers/gtag';
import {Button, Icon, message, Progress, Spin, Table, Tag, Upload} from 'antd';

const API_URL = 'https://j7f5k92zof.execute-api.us-east-1.amazonaws.com/prod/pdf';
const Dragger = Upload.Dragger;

const columns = [{
  title: 'Resource',
  dataIndex: 'resource',
  key: 'resource'
}, {
  title: 'Amount',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: 'Price per unit',
  dataIndex: 'price',
  key: 'price',
  render(text) {
    return <span style={{float: 'right'}}>{text}</span>
  }
}, {
  title: 'Sum',
  dataIndex: 'sum',
  key: 'sum',
  render(text) {
    return <span style={{float: 'right'}}>{text}</span>
  }
}];

const data = [
  {
    key: '1',
    resource: 'S3 Storage',
    amount: '1,000,000 * 5MB',
    price: '$0.000023',
    sum: '$115.00'
  },
  {
    key: '2',
    resource: 'Lambda Runtime',
    amount: '1,000,000 * 1.5GB * 1.2s',
    price: '$0.00002501',
    sum: '$30.01'
  },
  {
    key: '3',
    resource: 'S3 PUT Requests',
    amount: '1,000,000',
    price: '$0.000005',
    sum: '$5.00'
  },
  {
    key: '4',
    resource: 'S3 GET Requests',
    amount: '1,000,000',
    price: '$0.0000004',
    sum: '$0.40'
  },
  {
    key: '5',
    resource: 'Lambda Requests',
    amount: '1,000,000',
    price: '$0.0000002',
    sum: '$0.20'
  }
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const self = this;

    return <Layout title="Serverless LibreOffice">
      {/*language=CSS*/}
      <style jsx>{`
          section {
              margin-top: 32px;
              margin-bottom: 32px;
          }
      `
      }</style>
      {/*language=CSS*/}
      <style jsx global>{`
          .ant-progress-outer {
              padding-right: calc(2em + 5em) !important;
              margin-right: calc(-2em - 5em) !important;
          }

          .ant-progress-text {
              width: auto;
          }
      `
      }</style>

      <Head>
        <title>Serverless LibreOffice in AWS Lambda | Demo</title>
        <meta property="og:title" content="Serverless LibreOffice in AWS Lambda | Demo"/>
        <meta property="og:image"
              content="https://cdn-images-1.medium.com/max/1600/1*4q_I8VM6Gtmtw6TAjORylA.png"/>
        <meta property="og:image:width" content="1600"/>
        <meta property="og:image:height" content="817"/>
        <meta property="og:description" content="Try converting your document into PDF"/>
      </Head>

      <header>
        <h1>Serverless LibreOffice PDF Converter</h1>

        <p>
          This is a full featured <a href="https://www.libreoffice.org/">LibreOffice </a>
          compiled to run in <a href="https://aws.amazon.com/lambda/">AWS Lambda</a> environment.
        </p>

        <p style={{marginBottom: 0}}>
          But stripped from useless stuff, so it takes only 109 out of 250 MB function's&nbsp;
          <code>zip</code> artifact.
        </p>

        <Progress percent={Math.ceil(109 / 250 * 100)} format={() => '109 / 250 MB'}/>

        <p>
          And converts almost any office document to PDF:
        </p>

        <div style={{marginBottom: '1em'}}>
          <Tag>.doc</Tag>
          <Tag>.docx</Tag>
          <Tag>.ppt</Tag>
          <Tag>.pptx</Tag>
          <Tag>.xls</Tag>
          <Tag>.xlsx</Tag>
          <Tag>.numbers</Tag>
          <Tag>.pages</Tag>
          <Tag>.key</Tag>
          <Tag>.csv</Tag>
          <Tag>.txt</Tag>
          <Tag>.odt</Tag>
          <Tag>.ods</Tag>
          <Tag>.odt</Tag>
          <Tag>.odp</Tag>
          <Tag>.html</Tag>
          <Tag>.rtf</Tag>
          <Tag>.xlt</Tag>
          <Tag>.psd</Tag>
          <Tag>.bmp</Tag>
          <Tag>.png</Tag>
          <Tag>.xml</Tag>
          <Tag>.svg</Tag>
          <Tag>.cdr</Tag>
          <Tag>.eps</Tag>
          <Tag>.psw</Tag>
          <Tag>.dot</Tag>
          <Tag>.tiff</Tag>
          <Tag><em>and more</em></Tag>
        </div>

        <a href="https://github.com/vladgolubev/serverless-libreoffice" target="_blank">
          <Button type="primary" icon="github" onClick={() => trackSocialClick('GitHub')}>
            Go to GitHub
          </Button>
        </a>

        <a style={{marginLeft: 16}} target="_blank"
           href="https://medium.com/@vladholubiev/how-to-run-libreoffice-in-aws-lambda-for-dirty-cheap-pdfs-at-scale-b2c6b3d069b4">
          <Button icon="edit" onClick={() => trackSocialClick('Medium')}>
            Read on Medium
          </Button>
        </a>

        <a style={{marginLeft: 16}}
           target="_blank"
           onClick={(e) => {
             e.preventDefault();
             window.open(e.currentTarget.href, 'Twitter', 'height=285,width=550,resizable=1');
           }}
           href="https://twitter.com/intent/tweet?via=vladholubiev&hashtags=lambda,serverless&url=https%3A%2F%2Fvladholubiev%2Fserverless-libreoffice&text=Run%20LibreOffice%20Inside%20AWS%20Lambda">
          <Button icon="twitter" onClick={() => trackSocialClick('Twitter')}>
            Tweet
          </Button>
        </a>
      </header>

      <section>
        <h2>Demo</h2>

        {self.state.pdfFileURL &&
        <p>
          <a target="_blank" href={self.state.pdfFileURL}>{self.state.pdfFileURL}</a>
          <br/>
          <Button style={{marginTop: 16}} icon="reload"
                  onClick={() => {
                    trackLinkClick('pdf_actions', 'One More!');
                    self.setState({pdfFileURL: false})
                  }
                  }>
            One more!
          </Button>
        </p>
        }

        {!self.state.pdfFileURL &&
        <div style={{height: 180, textAlign: 'center', background: 'rgba(0,0,0,0.05)'}}>
          {self.state.loading &&
          <Spin size="large" tip={self.state.loadingText}
                style={{marginTop: 75, transform: 'scale(1.5)'}}/>}

          {!self.state.loading &&
          <Dragger {...{
            multiple: false,
            showUploadList: false,
            action: API_URL,
            beforeUpload(file) {
              const reader = new FileReader();
              self.setState({loading: true, loadingText: 'Reading file from your disk'});

              if (file.size > 1024 * 1024) {
                message.error('Please select file <= 1MB');

                self.setState({loading: true, loadingText: 'Please select file <= 1MB'});

                setTimeout(() => {
                  self.setState({loading: false});
                }, 1500);

                return false;
              }

              reader.onload = function() {
                const filename = file.name;
                const base64File = reader.result.split(/^data:.+\/.+;base64,/)[1];

                const options = {
                  method: 'POST',
                  body: JSON.stringify({filename, base64File}),
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    // don't worry, it has restricted AWS API Gateway Usage Plan
                    // So this is for demo purposes only
                    'x-api-key': 'lFHtiYT6Kt5tAGU8YnUsX005zjsxsaaKnStu7B70'
                  },
                };

                message.info('Upload started...');
                self.setState({loading: true, loadingText: 'Sending request to API'});

                fetch(API_URL, options)
                  .then(resp => resp.json())
                  .then(({pdfFileURL}) => {
                    console.debug('[converted]', pdfFileURL);
                    self.setState({pdfFileURL});

                    message.success('Converted!');
                    self.setState({loading: false});
                  })
                  .catch((error) => {
                    console.debug(error);
                    message.error(error);
                    self.setState({loading: false});
                  });
              };

              reader.readAsDataURL(file);

              return false;
            }
          }}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Max 1MB. Your file will be publicly accessible and
              deleted
              in 24 hours</p>
          </Dragger>
          }
        </div>
        }
      </section>

      <section>
        <h2>Pricing Example</h2>

        <p>
          So you need to convert 1 million documents average of 5 MB size.
        </p>

        <p>
          This will result in 5 terabytes of S3 storage per month. As you see, this is the primary
          driver of price, not computing cost.
        </p>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          footer={() => <span>
          <strong>Total: </strong>
          <span style={{float: 'right'}}><strong>$150.61</strong></span>
        </span>}/>
      </section>

      <section>
        <h2>Open Improvements</h2>

        <h3>Reduce Cold Start Time</h3>

        <p>
          Currently ƛ unpacks 109 MB <code>.tar.gz</code> to <code>/tmp</code> folder which takes
          ~1-2
          seconds on cold start.
        </p>

        <p>
          Would be nice to create a single compressed executable to save unpack time and increase
          portability.
          I tried using <a href="http://www.magicermine.com/" target="_blank">Ermine</a> packager
          and
          it works!!
          But unfortunately this is commercial software. Similar open-source analogue
          <a href="http://statifier.sourceforge.net/" target="_blank"> Statifier</a> produces
          broken
          binaries.
        </p>

        <p>
          Maybe someone has another idea how to create a single executable from a folder full of
          shared objects.
        </p>

        <h3>Further Size Reduction</h3>

        <p>
          I am not a Linux or C++ expert, so for sure I missed some easy "hacks" to reduce size of
          compiled LibreOffice.
        </p>

        <p>
          Mostly I just excluded from compilation as much unrelated stuff as possible. And
          stripped
          symbols from shared objects.
        </p>

        <p>
          Here is the list of:&nbsp;
          <a href="https://gist.github.com/vladgolubev/1dac4ed47a5febf110c668074c6b671c"
             target="_blank">
            available RPM packages
          </a>
          &nbsp;and&nbsp;
          <a href="https://gist.github.com/vladgolubev/439559fc7597a4fb51eaa9e97b72f319"
             target="_blank">
            libraries
          </a>
          &nbsp;available in AWS Lambda Environment, which can be helpful.
        </p>
      </section>
    </Layout>;
  }
}
