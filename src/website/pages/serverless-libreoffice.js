import Layout from '../components/Layout';
import {Button, Icon, message, Progress, Table, Tag, Upload} from 'antd';

const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
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
    price: '$0.023',
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
  <Layout>
    {/*language=CSS*/}
    <style jsx>{`
        section {
            margin-top: 32px;
            margin-bottom: 32px;
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
        Compressed it takes only 109 out of 250 MB function's <code>zip</code> artifact.
        <Progress percent={Math.ceil(109 / 250 * 100)}/>
      </p>

      {/*<p>*/}
      {/*And unzipped it takes 340 of 512 ephemeral Lambda <code>/tmp</code> storage.*/}
      {/*<Progress percent={Math.ceil(340 / 512 * 100)}/>*/}
      {/*</p>*/}

      <p>
        And converts almost any office document to PDF:
      </p>

      <p>
        <div>
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
          <Tag>.gif</Tag>
          <Tag>.svg</Tag>
          <Tag>.cdr</Tag>
          <Tag>.cmx</Tag>
          <Tag>.dif</Tag>
          <Tag>.eps</Tag>
          <Tag>.emf</Tag>
          <Tag>.gpl</Tag>
          <Tag>.gnm</Tag>
          <Tag>.hwp</Tag>
          <Tag>.plt</Tag>
          <Tag>.jd</Tag>
          <Tag>.jpg</Tag>
          <Tag>.pct</Tag>
          <Tag>.met</Tag>
          <Tag>.pxl</Tag>
          <Tag>.psw</Tag>
          <Tag>.dot</Tag>
          <Tag>.svm</Tag>
          <Tag>.tiff</Tag>
          <Tag>.wps</Tag>
          <Tag>... and so on</Tag>
        </div>
      </p>

      <a href="https://github.com/vladgolubev/serverless-libreoffice" target="_blank">
        <Button type="primary" icon="github">
          Go to GitHub
        </Button>
      </a>
    </header>
    `
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

      <p>So you need to convert 1 million documents average of 5 MB size</p>

      <p>This will result in 5 terabytes of S3 storage per month. As you see this is the main
        driver of price, not computing cost.</p>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        footer={() => <span>
          <strong>Total: </strong>
          <span style={{float: 'right'}}>$150.612</span>
        </span>}/>
    </section>
  </Layout>
