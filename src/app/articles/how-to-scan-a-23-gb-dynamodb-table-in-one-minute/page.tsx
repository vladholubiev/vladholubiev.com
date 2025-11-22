import {ArticleLayout} from '@/components/ArticleLayout';
import {buildArticleMetadata} from '@/lib/seo';
import {Heading} from '@/components/Heading';
import Image from 'next/image';
import {CodeBlock} from '@/components/CodeBlock';
import image01 from './image-01.webp';
import image02 from './image-02.webp';
import image03 from './image-03.webp';
import image04 from './image-04.webp';
import image05 from './image-05.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2022-11-11',
  title: 'How to Scan a 23 GB DynamoDB Table in One Minute',
  description: `For the cases when you screw up schema design.`,
  readingTime: '5 min read',
  mediumUrl:
    'https://medium.com/shelf-io-engineering/how-to-scan-a-23-gb-dynamodb-table-in-1-minute-110730879e2b',
};

const slug = 'how-to-scan-a-23-gb-dynamodb-table-in-one-minute';

export const metadata = buildArticleMetadata({
  title: meta.title,
  description: meta.description,
  date: meta.date,
  slug,
});

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        While running DynamoDB workloads in production with over 500 GB of data for a couple of
        years, I accumulated a couple of lessons learned that I&apos;ll be sharing. One of them I
        wrote previously about:{' '}
        <a href="https://medium.com/shelf-io-engineering/how-to-speed-up-long-dynamodb-queries-by-2x-c66a2987d53a">
          How to Speed-up Long DynamoDB Queries by 2x
        </a>
        .
      </p>

      <p>
        AWS DynamoDB is a great database. It&apos;s blazing fast, reliable, and infinitely scalable.
        However, the query language is quite limited. The flexibility of your queries heavily
        depends on the Hash Key design, which you can read about{' '}
        <a href="https://dynobase.dev/dynamodb-keys/">here</a>.
      </p>

      <Heading level={2}>Problem</Heading>

      <p>
        While you can go a long way with CRUD operations over a small subset of items (&lt;1,000),
        sometimes you find yourself in a situation where you need to query a large table by an
        attribute that is not a part of your hash key.
      </p>

      <p>
        Imagine a table consisting of the user&apos;s notifications, where the hash key is the
        user&apos;s ID.
      </p>

      <Image src={image01} alt="" className="no-rounding" />

      <p>
        There are basically two primary recommended APIs to fetch data from DynamoDB:
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html">
          GetItem
        </a>{' '}
        and{' '}
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html">
          Query
        </a>
        . With GetItem you&apos;re limited to fetching 1 single record by its key, and with Query,
        you can fetch multiple records that share the same key.
      </p>

      <p>
        But what if you want to query an item based on an attribute, that is not in the key? For
        example, by <code>senderId</code> as in our example?
      </p>

      <p>
        AWS DynamoDB provides an API for that:{' '}
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html">
          Scan
        </a>
        . However, it comes with a lot of caveats:
      </p>

      <ul>
        <li>
          Scanning is slow. Extremely slow. It&apos;s basically a brute-force mechanism to scan your
          entire table, each record one by one.
        </li>
        <li>
          Scanning is expensive. With DynamoDB, you pay for the Read Request Units you consume. And
          by scanning the entire table, you&apos;ll pay $1.25 for a 10 GB table.
        </li>
        <li>
          Scanning is cumbersome. Scan API is paginated. Each Scan request returns up to 1 MB of
          data. So to scan a 10 GB table, you&apos;ll need to paginate sequentially to make 10,000
          requests.
        </li>
      </ul>

      <p>
        So if Scan API is so bad, why would you ever want to use it? For sure, you must not use it
        in production code, but there are other use cases as:
      </p>

      <ul>
        <li>Migrating data out of the DynamoDB table to another table or another datastore.</li>
        <li>Finding a small subset of data from the entire table, for debugging purposes.</li>
      </ul>

      <p>
        Actually, there are plenty of AWS services that use DynamoDB Scan API under the hood. For
        example{' '}
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html">
          DynamoDB to S3 Export
        </a>{' '}
        or{' '}
        <a href="https://docs.aws.amazon.com/athena/latest/ug/connectors-dynamodb.html">
          AWS Athena Federated Query
        </a>
        .
      </p>

      <p>
        Let&apos;s say you evaluated all the cons and decided to use Scan nevertheless. We cannot
        make it cheaper. But we can make it <strong>faster</strong> and <strong>easier</strong> to
        use! Let&apos;s see how.
      </p>

      <Heading level={2}>Solution: Speed</Heading>

      <p>
        To address the first problem of speed, we can use a{' '}
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html#Scan.ParallelScan">
          Parallel Scan
        </a>
        . I am quoting the AWS Documentation here:
      </p>

      <blockquote>
        <p>
          By default, the <code>Scan</code> operation processes data sequentially. Amazon DynamoDB
          returns data to the application in 1 MB increments, and an application performs additional{' '}
          <code>Scan</code> operations to retrieve the next 1 MB of data.
        </p>

        <p>
          Scan operation can logically divide a table into multiple segments, with multiple
          application workers scanning the segments in parallel.
        </p>
      </blockquote>

      <p>Here is an excellent illustration from AWS Docs:</p>

      <Image src={image02} alt="" className="no-rounding" />

      <p>
        The idea is to issue Scan API requests in parallel, by providing the <code>Segment</code>{' '}
        and <code>TotalSegments</code> parameters:
      </p>

      <ul>
        <li>Worker #1: Segment: 0, TotalSegments: 10</li>
        <li>Worker #2: Segment: 1, TotalSegments: 10</li>
        <li>Worker #3: Segment: 2, TotalSegments: 10</li>
        <li>… and so on</li>
      </ul>

      <p>
        By doing so, your table will be virtually divided into many segments, and then you paginate
        through the results of each segment, just like you did with the regular Scan API call.
      </p>

      <p>
        And a great thing is, the maximum number of segments you can request is{' '}
        <strong>1,000,000</strong>! So if your table is 10 GB, and you split it into 1 M segments,
        each worker would need to scan only 10 MB of data, which equals 10 requests only.
      </p>

      <p>
        Each worker could be either a dedicated thread in your process, or it could be even a
        different server, or even better, a Lambda function.
      </p>

      <p>
        So we have found a way to overcome the speed problem. By using parallel scans, we can
        greatly speed up scanning. Now let&apos;s take a look at the ease of use aspect of a
        problem.
      </p>

      <Heading level={2}>Solution: Convenience</Heading>

      <p>
        Keeping track of all the segments and paginating through results is not a fun coding problem
        to solve when you need to get something done. Fortunately, I&apos;ve created a Node.js
        library to help solve this problem.
      </p>

      <blockquote>
        <p>
          Github Repo:{' '}
          <a href="https://github.com/shelfio/dynamodb-parallel-scan">dynamodb-parallel-scan</a>
        </p>
      </blockquote>

      <CodeBlock
        language="typescript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`const {DynamoDB} = require('aws-sdk')`}
      </CodeBlock>

      <p>
        This library encapsulates the logic behind many things you need to remember when you
        implement parallel scanning:
      </p>

      <ul>
        <li>Keeping track of scan segments and controlling the concurrency of requests.</li>
        <li>
          Getting a stream of items as they appear during scanning vs fetching all of them at once.
        </li>
        <li>
          Backpressure mechanism to avoid hitting process memory limits when fetching large volumes
          of data. It will pause scanning requests until you process the previous chunk of data.
        </li>
      </ul>

      <p>Here is a sample code of using a library to scan a table with 1,000 parallel requests:</p>

      <CodeBlock
        language="typescript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`const {parallelScan} = require('@shelf/dynamodb-parallel-scan');

(async () => {
  const items = await parallelScan(
    {
      TableName: 'files',
      FilterExpression: 'attribute_exists(#fileSize)',
      ExpressionAttributeNames: {
        '#fileSize': 'fileSize',
      },
      ProjectionExpression: 'fileSize',
    },
    {concurrency: 1000}
  );

  console.log(items);
})();`}
      </CodeBlock>

      <p>
        This approach is great when you know that the data you&apos;re going to fetch will fit into
        your memory, and you are ok with getting the data once a full table scan finishes.
      </p>

      <p>
        Another way of fetching the data in a streaming manner is useful when the volume is too high
        to keep in memory, so you want to consume a chunk of the scanned items as soon as they
        accumulate.
      </p>

      <p>
        You can control the concurrency, chunk size, and the high watermark, which controls the
        backpressure mechanism to avoid fitting too much data into memory. The library will pause
        scanning until you&apos;re able to iterate to the next chunk of data.
      </p>

      <CodeBlock
        language="typescript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`const {parallelScanAsStream} = require('@shelf/dynamodb-parallel-scan');

(async () => {
  const stream = await parallelScanAsStream(
    {
      TableName: 'files',
      FilterExpression: 'attribute_exists(#fileSize)',
      ExpressionAttributeNames: {
        '#fileSize': 'fileSize',
      },
      ProjectionExpression: 'fileSize',
    },
    {concurrency: 1000, chunkSize: 10000, highWaterMark: 10000}
  );

  for await (const items of stream) {
    console.log(items); // 10k items here
    // do some async processing to offload data from memory
    // and move on to cosuming the next chunk
    // scanning will be paused for that time
  }
})();`}
      </CodeBlock>

      <p>Great, let&apos;s look at the benchmarks now.</p>

      <Heading level={2}>Performance Benchmarks</Heading>

      <p>
        <a href="https://gist.github.com/vladholubiev/35bd4f891166a7dca551f38d5c8d35de">
          Here is the code snippet
        </a>{' '}
        I used to run the benchmark. The benchmark will run on a single machine in a single process.
      </p>

      <p>
        I am going to run the script with the <code>DEBUG=ddb-parallel-scan</code> environment
        variable in order to see the debug output of the library as it performs a scan.
      </p>

      <p>
        I have a DynamoDB table that is 23 GB in size and has 36,000,000 records. Each record is 600
        bytes on average.
      </p>

      <p>
        The first time, I run the script with the <code>concurrency: 1</code> , and the next time I
        run it with <code>concurrency: 250</code>.
      </p>

      <p>As the code runs, here is a glimpse of the debug output:</p>

      <CodeBlock
        language="text"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`ddb-parallel-scan (96%) [224/250] [time:196ms] [fetched:0] [total (fetched/scanned/table-size):908/34853064/36298819] +3ms
ddb-parallel-scan (96%) [145/250] [time:216ms] [fetched:0] [total (fetched/scanned/table-size):920/34854754/36298819] +8ms
ddb-parallel-scan (96%) [210/250] [time:232ms] [fetched:0] [total (fetched/scanned/table-size):920/34856457/36298819] +5ms
ddb-parallel-scan (96%) [211/250] [time:223ms] [fetched:0] [total (fetched/scanned/table-size):920/34858126/36298819] +3ms`}
      </CodeBlock>

      <p>You can see:</p>

      <ul>
        <li>which segment is currently being paginated (145–224).</li>
        <li>how much time it takes (~200ms on average).</li>
        <li>how many items were fetched that meet the filtering criteria (920 so far).</li>
        <li>and the progress of the scanned items (34 out of 36 million items were scanned).</li>
      </ul>

      <p>Let&apos;s compare the results!</p>

      <Image src={image03} alt="" className="no-rounding" />

      <p>
        So in my example, by running the script on the <code>t4g.small</code> EC2 instance, I was
        able to scan a 23 GB table in <strong>just 1 minute</strong>! While the sequential scan took
        49 minutes. <strong>50x faster!</strong> Not bad!
      </p>

      <p>
        The only time you won&apos;t see a performance improvement, is when your hash key
        distribution is not uniform enough. If you have a table where 100% of items have the same
        hash key — DynamoDB won&apos;t be able to split your table into segments. Your code will end
        up scanning one segment at a time.
      </p>

      <p>
        So as a rule of thumb, don&apos;t attempt to set a concurrency higher than a number of
        unique hash key values in a table. The illustration below shows a good (left) and a bad
        (right) hash key design.
      </p>

      <Image src={image04} alt="" className="no-rounding" />

      <blockquote>
        <p>
          Uniformly unique hash keys on the left, and unbalanced hash keys on the right. Parallel
          scanning will work better for the table on the left, and won&apos;t have any positive
          effect on the second table.
        </p>
      </blockquote>

      <Heading level={2}>Cost</Heading>

      <p>While running the scan, our table peaked at ~43,600 Read Capacity Units consumed.</p>

      <Image src={image05} alt="" className="no-rounding" />

      <p>
        A single scan over such a table will cost us $2.88. Here is a{' '}
        <a href="https://calculator.aws/#/estimate?id=2ccb4254d1768f87796f4a19ab299fe272d57d7c">
          link
        </a>{' '}
        to the AWS Cost Calculator saved report.
      </p>

      <p>
        Note, that my table has{' '}
        <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html">
          On-Demand capacity mode
        </a>{' '}
        enabled. This means AWS will scale up the read capacity of the table as needed, temporarily
        just for the one-time scan operation. If you are on provisioned capacity mode, you might
        want to fine-tune the concurrency parameter to avoid throttling.
      </p>

      <Heading level={2}>Summary</Heading>

      <p>
        DynamoDB Scan API provides a way to issue concurrent requests to scan a table concurrently.
        Using 100–200 segments in a single process will give you{' '}
        <strong>at least 50x improvement</strong> in the scanning speed.
      </p>

      <p>
        If you want to go beyond that, make sure your machine has enough network bandwidth to handle
        so many concurrent requests. If not — consider splitting the scan operation across multiple
        machines.
      </p>

      <p>
        For convenience, you can use the{' '}
        <a href="https://github.com/shelfio/dynamodb-parallel-scan">dynamodb-parallel-scan</a>{' '}
        node.js library, or read the implementation for inspiration for implementing it in other
        programming languages.
      </p>

      <p>
        If you liked this article, consider following me to read more about lessons learned (and
        horror stories) around DynamoDB, AWS, and Serverless.
      </p>
    </ArticleLayout>
  );
}
