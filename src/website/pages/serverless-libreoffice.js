import Layout from '../components/Layout';
import {Button, Icon, message, Progress, Table, Tag, Upload} from 'antd';

const Dragger = Upload.Dragger;
const props = {
  multiple: false,
  showUploadList: false,
  action: 'https://s3.amazonaws.com/serverless-libreoffice-pdf/tmp/uploads',
  onChange(info) {
    console.log('info', info);
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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

export default () =>
  <Layout title="Serverless LibreOffice">
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
    <header>
      <h1>Serverless LibreOffice PDF Converter</h1>

      <p>
        This is a full featured <a href="https://www.libreoffice.org/">LibreOffice </a>
        compiled to run in <a href="https://aws.amazon.com/lambda/">AWS Lambda</a> environment.
      </p>

      <p>
        But stripped from useless stuff, so it takes only 109 out of 250 MB function's&nbsp;
        <code>zip</code> artifact.
        <Progress percent={Math.ceil(109 / 250 * 100)} format={() => '109 / 250 MB'}/>
      </p>

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
        <Button type="primary" icon="github">
          Go to GitHub
        </Button>
      </a>

      <a style={{marginLeft: 16}}
         href="https://twitter.com/intent/tweet?via=vladholubiev&hashtags=lambda,serverless&url=https%3A%2F%2Fvladholubiev%2Fserverless-libreoffice&text=Run%20LibreOffice%20Inside%20AWS%20Lambda%3A%20create%20PDFs%20at%20scale">
        <Button icon="twitter">
          Tweet
        </Button>
      </a>
    </header>

    <section>
      <h2>Demo</h2>

      <div style={{height: 180}}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Max 5MB. Your file will be publicly accessible and deleted
            in 24 hours</p>
        </Dragger>
      </div>
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
        Currently ƛ unpacks 109 MB <code>.tar.gz</code> to <code>/tmp</code> folder which takes ~1-2
        seconds on cold start.
      </p>

      <p>
        Would be nice to create a single compressed executable to save unpack time and increase
        portability.
        I tried using <a href="http://www.magicermine.com/" target="_blank">Ermine</a> packager and
        it works!!
        But unfortunately this is commercial software. Similar open-source analogue
        <a href="http://statifier.sourceforge.net/" target="_blank"> Statifier</a> produces broken
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
        Mostly I just excluded from compilation as much unrelated stuff as possible. And stripped
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
  </Layout>
