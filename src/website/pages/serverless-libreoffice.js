import Layout from '../components/Layout';
import {Icon, message, Table, Upload} from 'antd';

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

const requestPrice = 0.0000002; // 1 Lambda invocation
const gbsPrice = 0.00002501; // 1.5 GB memory 1 second of execution
const averageConvertionTime = 3; // in seconds

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

const data = [{
  key: '1',
  resource: 'Lambda Requests',
  amount: '1,000,000',
  price: '$0.0000002',
  sum: '$0.20'
}, {
  key: '2',
  resource: 'Lambda Executions',
  amount: '1,000,000 * 1.5GB * 1.2s',
  price: '$0.00002501',
  sum: '$30.012'
}, {
  key: '3',
  resource: 'S3 storage',
  amount: '1,000,000 * 5MB',
  price: '$0.023',
  sum: '$115'
}, {
  key: '4',
  resource: 'S3 PUT requests',
  amount: '1,000,000',
  price: '$0.000005',
  sum: '$5'
}, {
  key: '5',
  resource: 'S3 GET requests',
  amount: '1,000,000',
  price: '$0.0000004',
  sum: '$0.40'
}];

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
        This is a demo of full featured <a href="https://www.libreoffice.org/">LibreOffice</a>&nbsp;
        compiled to run in <a href="https://aws.amazon.com/lambda/">AWS Lambda</a> environment.
      </p>

      <p>
        It converts almost <strong>ANY</strong> office document to PDF in seconds.
      </p>

      <p>Open-source on 👉🏻 <a href="https://github.com/vladgolubev">GitHub</a> 👈🏻</p>
    </header>

    <section>
      <div style={{height: 180}}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Max 5MB. Your will be publicly accesible</p>
        </Dragger>
      </div>
    </section>

    <section>
      <h2>Pricing Example</h2>

      <p>So you need to convert 1 million documents average of 5 MB size</p>

      <p>This will result in 5 terrabytes of S3 storage per month. As you see this is the main driver of price, not computing cost.</p>

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
