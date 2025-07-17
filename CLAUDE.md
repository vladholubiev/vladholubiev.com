# Code Conventions

## Blog Articles

- Use `import {Heading} from '@/components/Heading'` instead of h1-h6 in `articles/*.tsx` blog posts

## Code Snippets

- Use `import {ShikiHighlighter} from 'react-shiki'` for code snippets in blog posts like this:
```tsx
<ShikiHighlighter
language="javascript"
theme="github-dark"
showLanguage={false}
addDefaultStyles={true}
>
{`const {convertTo} = require('@shelf/aws-lambda-libreoffice');
convertTo('document.docx', 'pdf'); // returns /tmp/document.pdf`}
</ShikiHighlighter>
```
