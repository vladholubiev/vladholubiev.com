import {ArticleLayout} from '@/components/ArticleLayout'
import Image from 'next/image'
import image01 from './image-01.webp'
import image02 from './image-02.webp'
import image03 from './image-03.webp'
import image04 from './image-04.webp'
import image05 from './image-05.webp'
import image06 from './image-06.webp'
import image07 from './image-07.webp'

export const meta = {
  author: 'Vlad Holubiev',
  date: '2023-03-28',
  title: 'Five Ways to Deal With AWS DynamoDB GSI Throttling',
  description: 'A notorious performance bottleneck. But it can be solved.',
}

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <h2>Understanding DynamoDB Throttling</h2>
      
      <p>DynamoDB is a fully managed NoSQL database service designed to deliver fast and predictable performance to applications.
      It stores data across multiple partitions and provides single-digit millisecond response times.</p>
      
      <p>However, handling increased load or demand may sometimes result in performance bottlenecks.
      In the context of DynamoDB, this bottleneck is known as throttling.</p>
      
      <p>Throttling occurs when requests to DynamoDB exceed the provisioned throughput capacity.
      When this happens, database performance may be affected, and the service returns HTTP 400 status codes with an
      error type of <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html#Programming.Errors.MessagesAndCodes">ProvisionedThroughputExceededException</a>.</p>
      
      <p>Global Secondary Indexes (GSIs) are a powerful feature allowing you to create additional access patterns for your data.
      <strong>They have their own read and write capacity</strong> provisioned separately from the base table.
      DynamoDB offers two types of capacity modes: provisioned and on-demand.
      In this article, we&apos;ll consider on-demand capacity mode.</p>
      
      <p>In this blog post, we will explore how throttling on a GSI affects the base table,
      the importance of proper partition key design, and strategies to handle and prevent throttling when dealing with DynamoDB tables with GSIs.</p>
      
      <h2>How Throttling on a GSI Affects the Base Table</h2>
      
      <p>GSIs have their own provisioned read and write capacity units, separate from the base table.
      While this separation allows you to optimize GSIs for their specific workloads, it also means that if a GSI is throttled, it can have an impact on the base table&apos;s read and write operations.</p>
      
      <p><strong>Tip:</strong> you can use <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/contributorinsights.html">Amazon CloudWatch Contributor Insights for DynamoDB</a> to identify the most frequently throttled keys.</p>
      
      <h3>Insufficient read capacity on GSI</h3>
      
      <blockquote>
        <p>If a GSI experiences throttling due to insufficient read capacity, <strong>the base table is not directly affected</strong>.</p>
      </blockquote>
      
      <p>This is because the base table and GSI maintain separate read capacity units.
      However, user experience or application performance may still suffer due to delayed or unsuccessful read operations on the GSI.</p>
      
      <h3>Insufficient write capacity on GSI</h3>
      
      <p>Throttling on a GSI write operation has a more significant impact on the base table.</p>
      
      <blockquote>
        <p>If a GSI does not have adequate write capacity, <strong>both the base table and its GSIs cannot complete write operations successfully</strong>.</p>
      </blockquote>
      
      <p>Consequently, it is crucial to monitor and manage GSI write capacity carefully to avoid negative performance implications on the base table.</p>
      
      <h2>Example Scenario</h2>
      
      <p>Imagine a situation where you have a Global Secondary Index (GSI) on your DynamoDB table, with a partition key <code>GSI1HK</code> having the value <code>org#&#123;orgId&#125;</code>.</p>
      
      <p>You created a GSI to be able to query all the users&apos; information by a single organization ID.</p>
      
      <Image src={image01} alt="" className="no-rounding"/>
      
      <p>You did your schema design right, you read the <a href="https://repost.aws/knowledge-center/primary-key-dynamodb-table">best practice of partition key design</a> and chose a high cardinality value for the <code>hash_key</code> which is <code>user_id</code>.</p>
      
      <p><code>user_id</code> is unique enough to prevent write throttles, right?</p>
      
      <p>But your table will face throttling issues if you&apos;re consistently writing over 1MB/s of data for a single organization.</p>
      
      <h2>Under the hood of GSIs. Why does this problem exist?</h2>
      
      <p>This can be explained by the fact how DynamoDB implements GSIs.
      GSIs are essentially a virtual copy of your table and DynamoDB with a different partition key.
      DynamoDB just encapsulates the logic of replicating your items as you write them into a new shadow table.</p>
      
      <Image src={image02} alt="" className="no-rounding"/>
      
      <p>So in reality, what happens, is DynamoDB is updating a &quot;shadow&quot; table in an eventually consistent fashion.
      And that &quot;shadow&quot; table now has a poorly optimized partition key, with low cardinality!</p>
      
      <p>So all your writes to the base table with different user IDs are being properly distributed across partitions to prevent bottlenecks.
      However, in the GSI with partition key GSI1HK as <code>org#&#123;orgId&#125;</code>, the writes for a single organization might result in a hot partition, leading to throttling.</p>
      
      <h2>Possible Remedies</h2>
      
      <p>All those approaches assume you are ok to undergo minor modifications to your GSI key format but still be able to query all the data in a table by that GSI.</p>
      
      <p>We are focusing on the write throttling problem, but most of the approaches are still applicable to mitigate read throttles.</p>
      
      <h3>A Table with Multiple Facets: Append facet to GSI</h3>
      
      <p>When architecting your DynamoDB schema, it&apos;s quite common to follow <a href="https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/">a single-table design pattern</a>, where multiple types of data are stored in one table.
      This approach has some benefits, like reducing the number of tables to manage and allowing better capacity utilization.
      However, it can also lead to challenges when it comes to the impact of hot partitions and throttling on your GSIs.</p>
      
      <p>Consider a use case in which you store data about products, users, and orders in a single table.
      Instead of having separate tables for each data type, they all coexist in one table, distinguished by different facet types.</p>
      
      <p>In such cases, splitting tables by facet can help you distribute the load and reduce the impact of throttling.
      To achieve this, append the facet type to the GSI hash key, allowing the partition key to balance the read and write operations across multiple partitions.</p>
      
      <p>For example, if your original GSI partition key is <code>GSI1HK=org#&#123;orgId&#125;</code>, you can modify it to include the facet, like <code>GSI1HK=org#&#123;orgId&#125;#product</code>, <code>GSI1HK=org#&#123;orgId&#125;#user</code>, and <code>GSI1HK=org#&#123;orgId&#125;#order</code>.</p>
      
      <Image src={image03} alt="" className="no-rounding"/>
      
      <p>This division of partition keys distributes data more evenly across partitions, reducing the chance of hot spots and improving scalability.
      This will not only mitigate throttling issues but also make your table more maintainable and your capacity usage more efficient.</p>
      
      <p>Yes, it will make it harder to query all the data belonging to a single organization.
      With the old design, you could query a table with a single request by <code>GSI1HK=org#org-1</code>, but now you need to issue multiple requests for different facets.
      So consider your requirements, to see can you trade the latency of querying all data by an organization for reducing the chance of write throttles.</p>
      
      <table>
        <thead>
          <tr>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mitigates throttling issues as long as your table has multiple facets.</td>
            <td>Doesn&apos;t apply when you have a single facet; one hot facet could still lead to throttles.</td>
          </tr>
        </tbody>
      </table>
      
      <h3>A Table with Multiple Facets: Use Multiple Tables</h3>
      
      <p>Consider the same example as in the previous section.
      Another approach is to avoid single-table design pattern and store different facets in separate tables.</p>
      
      <Image src={image04} alt="" className="no-rounding"/>
      
      <p>This is a very similar approach to the previous one with the same drawbacks: slower query latency when you need to fetch all data by one organization, with the added complexity of having to manage multiple tables.</p>
      
      <table>
        <thead>
          <tr>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Works when you have multiple facets in one table.</td>
            <td>Defeats the purpose of a single-table design.</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Adding suffixes to partition keys for shard distribution</h3>
      
      <p>Another approach to alleviate throttling and distribute the load on your DynamoDB table is by adding suffixes to your partition keys to create shards.</p>
      
      <p>Shards are partitions that distribute your data across multiple distinct partitions (or nodes) based on a portion of the partition key.
      This helps DynamoDB by having higher cardinality values in your keys.
      The risk of hot partitions and throttling is significantly reduced.</p>
      
      <p>Depending on the volume of data belonging to a single organization, you can append a deterministic shard number suffix to your GSI key.
      For example, a number of 1 to 20.</p>
      
      <Image src={image05} alt="" className="no-rounding"/>
      
      <p>This approach makes GSI key 20 times more unique, and reduces the chance of write throttles by 20 times!</p>
      
      <p>However, it increases query latency by 20 times as well.</p>
      
      <table>
        <thead>
          <tr>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agnostic to a number of facets in a table.</td>
            <td>More complex and slower queries by GSIs.</td>
          </tr>
          <tr>
            <td>Easy to scale by increasing the number of shards.</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Implementing SQS/Kinesis for write spike management and eventual consistency</h3>
      
      <p>In scenarios where your DynamoDB table experiences sudden spikes in write activity, a common solution to address this is to use an intermediate scalable buffer like Amazon SQS or Kinesis.
      By employing either of these services, you can distribute high-traffic workloads and ensure eventual consistency for data writes to your DynamoDB table.</p>
      
      <p>This approach works for cases, where you write to your tables directly as a result of the user&apos;s API request, and don&apos;t care much about data being available for reading in the table immediately.</p>
      
      <p>The idea is to control the speed of ingesting data and writing to a table by tuning the SQS/Kinesis parameters, such as batch size, polling interval, and Lambda&apos;s reserved concurrency.</p>
      
      <p>This is called a <a href="https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling">Queue-Based Load Leveling pattern</a>.</p>
      
      <table>
        <thead>
          <tr>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agnostic to a number of facets.</td>
            <td>Applicable if you don&apos;t have strong write consistency requirements.</td>
          </tr>
          <tr>
            <td>Scales indefinitely.</td>
            <td>Additional infrastructure cost incurred.</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Employing the CQRS pattern</h3>
      
      <p>The Command Query Responsibility Segregation (CQRS) pattern is a powerful approach to address specific performance issues related to high write throughput and complex query scenarios in DynamoDB.
      By separating your application&apos;s responsibilities into separate command and query models, you can optimize these components to focus on their specific roles, while ensuring eventual consistency between the two.</p>
      
      <Image src={image06} alt="" className="no-rounding"/>
      
      <p>In this case, you would write data directly to DynamoDB <strong>without employing GSIs</strong> and store the data required for complex queries in a secondary data store, such as Amazon Aurora.</p>
      
      <Image src={image07} alt="" className="no-rounding"/>
      
      <p>Then, you query data by organization ID from a secondary data store.</p>
      
      <table>
        <thead>
          <tr>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agnostic to facets.</td>
            <td>Harder to implement.</td>
          </tr>
          <tr>
            <td>Scales as long as secondary data store scales.</td>
            <td>Requires having a different database.</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Conclusion</h2>
      
      <p>In conclusion, throttling issues with DynamoDB Global Secondary Indexes can impact both the base table and the overall performance of your application.
      Proper partition key design and consideration of various approaches to handle throttling can aid in mitigating high-traffic workloads and ensuring scalable system performance.</p>
      
      <p>Some of the possible remedies include:</p>
      <ol>
        <li>Appending facets to the GSI.</li>
        <li>Using multiple tables.</li>
        <li>Distributing data via shard suffixes.</li>
        <li>SQS/Kinesis for load leveling.</li>
        <li>CQRS pattern.</li>
      </ol>
      
      <p>Assessing each strategy&apos;s pros and cons according to your specific use case and requirements will help you maintain the balance between performance, scalability, and data consistency for the best overall experience.</p>
    </ArticleLayout>
  )
}