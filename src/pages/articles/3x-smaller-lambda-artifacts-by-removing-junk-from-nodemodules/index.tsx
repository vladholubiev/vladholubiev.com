import {ArticleLayout} from '@/components/ArticleLayout';
import Image from 'next/image';
import image01 from './image-01.webp';
import image02 from './image-02.webp';
import image03 from './image-03.webp';
import image04 from './image-04.webp';
import image05 from './image-05.webp';

export const meta = {
  author: 'Vlad Holubiev',
  date: '2020-11-02',
  title: '3x Smaller Lambda Artifacts by Removing Junk From node_modules',
  description: 'The most obvious way would be to use webpack and do tree shaking. But I\'m not a fan of that approach. It\'s cumbersome to set up and has significant dev effort, especially when you face issues with…',
}

export default function Article() {
  return (
    <ArticleLayout meta={meta}>
      <p>Reducing artifact size proportionally correlates with the cold start latency.</p>
      
      <p>The most obvious way would be to use webpack and do tree shaking.
      But I'm not a fan of that approach.
      It's cumbersome to set up and has significant dev effort, especially when you face issues with bundling some backend dependencies.</p>
      
      <p>I'll talk about some "quick wins" instead.</p>
      
      <Image src={image01} alt="" className="no-rounding"/>
      
      <blockquote>
        <p>We'll use a tool called <a href="https://github.com/amio/flaming-disk-usage">fdu</a> to inspect junk in <code>node_modules</code>.</p>
      </blockquote>
      
      <p>We'll take one of my repos as an example
      When installing only production dependencies, the size of <code>node_modules</code> folder is 149.62 MB (36.1 MB zipped).
      At the end of the article, we'll reduce it down to 62.12 MB (12.2 MB zipped).</p>
      
      <Image src={image02} alt="" className="no-rounding"/>
      
      <h2>Don't bundle aws-sdk</h2>
      
      <p>This is the most obvious suggestion but still brings the most value.
      It helped me to reduce my zip artifact size <strong>by 7 MB</strong>.</p>
      
      <Image src={image03} alt="" className="no-rounding"/>
      
      <p>In case you don't need the latest version of <code>aws-sdk</code> — just drop it from your artifact size.</p>
      
      <p>Not adding it to <code>package.json</code> is not an option, because your tests might depend on it,
      and additionally, other dependencies might still install <code>aws-sdk</code> without you knowing it.</p>
      
      <p>We'll combat this problem in three steps.</p>
      
      <h2>Track currently available aws-sdk version in Lambda runtime</h2>
      
      <p>AWS maintains a page with the current aws-sdk version here: <a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html">https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html</a></p>
      
      <p>I've created an automatic alert to notify me when AWS puts a new <code>aws-sdk</code> version inside Lambda runtime.
      I like the <a href="https://distill.io/">Distill Chrome Extension</a>, it's free.</p>
      
      <p>Now we know for sure on which <code>aws-sdk</code> version we can rely upon in our code.</p>
      
      <h2>Use <a href="https://classic.yarnpkg.com/en/docs/selective-version-resolutions/">yarn resolutions</a> to ensure only 1 version of aws-sdk is installed</h2>
      
      <p>This is a wonderful feature if you're using yarn.
      Add these lines to your <code>package.json</code> and yarn will install only 1 instance of <code>aws-sdk</code> dependency, regardless of what other packages require.</p>
      
      <pre><code className="language-json">{`"resolutions": {
  "aws-sdk": "2.712.0"
}`}</code></pre>
      
      <h2>Exclude aws-sdk from final artifact zip</h2>
      
      <p>This step might depend on the way you create a zip artifact, but it looks for me as:</p>
      
      <pre><code className="language-bash">{`zip --quiet -r --exclude="node_modules/aws-sdk/*" \\
  artifact.zip \\
  lib node_modules`}</code></pre>
      
      <h2>Exclude TypeScript typings</h2>
      
      <p>This step helped me to remove <strong>16 MB</strong> of junk (<strong>2.2 MB</strong> zipped) from the final artifact zip.</p>
      
      <p>Whether you use TypeScript or not, many package ship typings to the NPM.
      They're useful during development but have no impact on the runtime.</p>
      
      <p>Here is a command to remove them:</p>
      
      <pre><code className="language-bash">{`npx del-cli \\
  "node_modules/**/@types/**" \\
  "node_modules/**/*.d.ts" \\
  "node_modules/**/.yarn-integrity" \\
  "node_modules/**/.bin"`}</code></pre>
      
      <h2>Exclude tests & browser builds with .yarnclean</h2>
      
      <p>This step reduced node_modules size by <strong>19.5 MB</strong> (<strong>14.6 MB</strong> zipped).</p>
      
      <p>Another great yarn feature — <a href="https://classic.yarnpkg.com/en/docs/cli/autoclean/">.yarnclean</a> file.
      You define glob patterns and yarn removes them from <code>node_modules</code> when running <code>yarn install</code>.</p>
      
      <p>What type of stuff is useful to remove?</p>
      
      <ul>
        <li>test files (<code>*.test.js</code>) — surprisingly many npm packages publish their tests to NPM.
        And you keep deploying this junk to Lambda runtime.</li>
        <li>IDE configurations: <code>.idea/*</code> , <code>.vscode/*</code>, <code>.eslintrc</code>, etc</li>
        <li>Graphic assets used for illustration purposes in <code>README.md</code></li>
        <li>Browser builds: <code>*.min.js</code>, <code>dist/*.js</code> , etc</li>
      </ul>
      
      <p>Just add a <code>.yarnclean</code> file to your repository with the list of glob patterns and enjoy size savings out of the box!</p>
      
      <p>You can initialize a fresh config by running <code>yarn autoclean --init</code>, or use my own collection of junk patterns I collected over the past year below.</p>
      
      <blockquote>
        <p>I compiled my own <code>.yarnclean</code> file with the junk I found in my repos: <a href="https://gist.github.com/vladholubiev/1c0e9fd4d569446cada21e4a3c64d0f8">https://gist.github.com/vladholubiev/1c0e9fd4d569446cada21e4a3c64d0f8</a></p>
      </blockquote>
      
      <h2>Before & After</h2>
      
      <Image src={image04} alt="" className="no-rounding"/>
      
      <h2>Bonus: Add more dependencies to yarn resolutions</h2>
      
      <p>It might depend on the codebase, but my projects and the dependencies I use depend on <code>lodash</code> a lot.
      When running <code>yarn install</code> I end up with many different versions of <code>lodash</code> installed, which differ only by patch increment.</p>
      
      <p>Here how it looks like in my <code>yarn.lock</code> file.</p>
      
      <pre><code>{`lodash@4.17.15:
  version "4.17.15"
  ...

lodash@^4.17.11
  version "4.17.11"
  ...
lodash@^4.17.14, lodash@^4.17.15, lodash@^4.17.19:
  version "4.17.20"
  ...`}</code></pre>
      
      <p>This is slightly risky, but I am ok with using 1 single lodash version in my repo to reduce Lambda size.
      Just update your <code>resolutions</code> section of the <code>package.json</code> file to look like:</p>
      
      <pre><code className="language-json">{`"resolutions": {
  "aws-sdk": "2.712.0",
  "lodash": "4.17.20"
}`}</code></pre>
      
      <p>After this change, I won another 15.5 MB of space!</p>
      
      <Image src={image05} alt="" className="no-rounding"/>
      
      <p>Keep lurking inside your <code>yarn.lock</code> file to find other inefficiencies.</p>
    </ArticleLayout>
  )
}