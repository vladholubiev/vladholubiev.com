import {ArticleLayout} from '@/components/ArticleLayout';
import Image from 'next/image';
import {ShikiHighlighter} from 'react-shiki';
import image01 from './image-01.webp';
import image02 from './image-02.webp';
import image03 from './image-03.webp';
import image04 from './image-04.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2022-01-05',
  title: 'How to Speed-up Long DynamoDB Queries by 2x',
  description: 'TL;DR; Implement parallel pagination from both ends instead of a sequential one.',
}

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <blockquote>
        <p>Note: &quot;Long&quot; queries are the ones that scan over 2 MB of data. The trick described in this article only applies to those.</p>
      </blockquote>
      
      <p><strong>TL;DR;</strong> Implement parallel pagination from both ends instead of a sequential one.</p>
      
      <h2>Situation</h2>
      
      <p>Imagine you&apos;re in a situation when you have thousands of items under the same partition key,
      and you need to find only a couple of items using <code>FilterExpression</code>.</p>
      
      <p>For the sake of the example, let&apos;s use the following table schema and try to find items where <code>number &gt; 0.5</code>.</p>
      
      <Image src={image01} alt="" className="no-rounding bg-white"/>
      
      <blockquote>
        <p>Schema created with <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html">NoSQL Workbench</a></p>
      </blockquote>
      
      <p>Here is the query you&apos;ll end up with:</p>
      
      <ShikiHighlighter
        language="javascript"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`FilterExpression: '#number > :number',
ExpressionAttributeNames: {
  '#hash_key': 'hash_key',
  '#number': 'number',
},
ExpressionAttributeValues: {
  ':hash_key': 'hk1',
  ':number': 0.5,
},`}
      </ShikiHighlighter>
      
      <p>Since we know the partition key, those items could be queried with <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html">Query</a>{' '}
      rather than <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html">Scan</a> operation.</p>
      
      <h2>Problem</h2>
      
      <p>You might think that DynamoDB Query operation is fast, but it has its own limits.
      As per documentation:</p>
      
      <blockquote>
        <p>A single <code>Query</code> operation will <strong>read up to a maximum of 1 MB of data</strong> and then apply any filtering to the
        results using <code>FilterExpression</code>. If <code>LastEvaluatedKey</code> is present in the response, <strong>you will need to paginate</strong> the result set.</p>
      </blockquote>
      
      <p>See, if you have thousands of items under the same partition key that exceed 1 MB, DDB will query up to 1 MB of data in 1 request.
      Then, it&apos;s up to you to implement pagination logic.</p>
      
      <p>With the sample table I created, it took <em>~450ms</em> for each query operation.
      When you have 20 MB of data to scan, it can take <em>~10s</em> to get the results you want if you implement sequential pagination.</p>
      
      <p>I&apos;ll leave the speculation that having such a data structure in DDB is wrong, and discuss only the solution to the problem at hand.</p>
      
      <p>Here is a diagram of the sequential iteration.</p>
      
      <Image src={image02} alt="" className="no-rounding bg-white"/>
      
      <p>In the scenario when each query takes <em>5s</em>, 4 queries will take <em>20s</em> to complete.</p>
      
      <h2>Side Note: Think Twice About This Approach</h2>
      
      <p>Using DynamoDB to query over thousands of items is not the best practice. But sometimes you really need this.</p>
      
      <p>Usually, I&apos;d recommend creating <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html">Global Secondary Indices</a>
      for such scenarios to avoid performance bottlenecks.
      But they come with some downsides.
      Sometimes you&apos;re not in control of a table to create an index, indices come with the added cost,
      indices can&apos;t guarantee strong read consistency, or you reached the quota of a maximum number of indices.</p>
      
      <p>So first, try to think about how to avoid such a situation altogether by changing the sort key design or using indices.
      If all you need is just make a query 2x faster w/o spending time to re-architect, then proceed reading.</p>
      
      <h2>Solution</h2>
      
      <p>I&apos;ve developed an NPM package that implements concurrent pagination from both ends: <a href="https://github.com/shelfio/dynamodb-query-optimized">dynamodb-query-optimized</a>.
      I&apos;ll explain how it works.</p>
      
      <p>DDB Query operation allows you specifying
      <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ScanIndexForward"><code>ScanIndexForward: true/false</code></a> parameter.</p>
      
      <blockquote>
        <p>If <code>ScanIndexForward</code> is <code>true</code>, DynamoDB <strong>returns the results in the order in which they are stored</strong> (by sort key value).
        This is the default behavior. If <code>ScanIndexForward</code> is <code>false</code>, DynamoDB <strong>reads the results in reverse order</strong> by sort key value, and then returns the results to the client.</p>
      </blockquote>
      
      <p>This parameter allows us to make 2 queries in parallel from both ends.
      The first query paginates through items from the beginning, and the second query paginates through items from the end.
      Pagination stops when each query reaches the middle.</p>
      
      <Image src={image03} alt="" className="no-rounding bg-white"/>
      
      <p>This simple trick shaves off a total query time by 2x!</p>
      
      <h2>Benchmark</h2>
      
      <p>I created a sample table and populated it with ~21 MB of data and wrote a query to find all items under the partition key <code>hk6</code> and <code>number &gt; 0.5</code>.</p>
      
      <Image src={image04} alt="" className="no-rounding bg-white"/>
      
      <p>Here are the results of the <a href="https://github.com/shelfio/dynamodb-query-optimized/blob/master/benchmark.ts">benchmark script</a>:</p>
      
      <ShikiHighlighter
        language="text"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`Regular query: ~21 MB of items: 9.023s
Optimized query: ~21 MB of items: 4.988s`}
      </ShikiHighlighter>
      
      <p>The optimized query is almost 2x faster when run locally.
      It would be even faster if executed in the AWS environment, be it a Lambda of an ECS service.</p>
      
      <p>Note: this method works slower when you query &lt;2 MB of data due to added network latency for making additional requests.</p>
      
      <ShikiHighlighter
        language="text"
        theme="github-dark"
        showLanguage={false}
        addDefaultStyles={true}
      >
        {`Regular query: <1 MB of items: 650ms
Optimized query: <1 MB of items: 704ms`}
      </ShikiHighlighter>
      
      <p>So you need to understand how many items are under your partition key before using this optimized query method.</p>
      
      <h2>Wrap Up</h2>
      
      <p>I got the inspiration for this solution while answering <a href="https://stackoverflow.com/questions/68629860/what-is-the-best-performance-i-can-get-by-querying-dynamodb-for-a-maximum-1mb/">this</a> Stack Overflow question.</p>
      
      <p>Here is the NPM package <a href="https://github.com/shelfio/dynamodb-query-optimized">dynamodb-query-optimized</a>.</p>
      
      <p>As a bonus, I included the <code>queryRegular</code> method in the library that conducts pagination
      sequentially for those cases when you have less than 2 MB of data to query.</p>
    </ArticleLayout>
  )
} 