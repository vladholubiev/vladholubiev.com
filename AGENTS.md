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

## React Components

- Avoid building components whose behavior relies heavily on external boolean props. Instead, **compose your UI from smaller, self-contained building blocks**, each handling a specific responsibility. When variations emerge, simply adjust the composition rather than introducing conditional logic. **Lift shared state into context providers** to decouple state management from your UI components. This ensures your components remain declarative, intuitive, and maintainable as your application scales.

## Tests

- There are no tests in this repo. Run linter via `pnpm run lint` after making changes and fix any issues.
