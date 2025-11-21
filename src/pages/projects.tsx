import Head from 'next/head';
import {NextPage} from 'next';

import {Card} from '@/components/Card';
import {SimpleLayout} from '@/components/SimpleLayout';
import {LinkIcon} from '@/components/icons/LinkIcon';

interface ProjectLink {
  href: string;
  label: string;
}

interface Project {
  name: string;
  description: string;
  link: ProjectLink;
}

const projects: Project[] = [
  {
    name: 'aws-lambda-libreoffice',
    description:
      'Easily run LibreOffice on AWS Lambda. Back in 2018, it was a nominee for the JavaScript Open Source Award in the "Most Exciting Use of Technology" category, alongside CodeSandbox.',
    link: {href: 'https://github.com/shelfio/aws-lambda-libreoffice', label: 'github.com'},
  },
  {
    name: 'awsnews.info',
    description: 'A streamlined website for reading AWS updates, sifted from the clutter.',
    link: {href: 'https://awsnews.info/', label: 'awsnews.info'},
  },
  {
    name: 'jest-mongodb',
    description: 'Test your queries against a real MongoDB instance locally with Jest.',
    link: {href: 'https://github.com/shelfio/jest-mongodb', label: 'github.com'},
  },
  {
    name: 'jest-dynamodb',
    description: 'Test your queries against a real DynamoDB instance locally with Jest.',
    link: {href: 'https://github.com/shelfio/jest-dynamodb', label: 'github.com'},
  },
  {
    name: 'chrome-aws-lambda-layer',
    description: '43 MB Google Chrome to fit inside AWS Lambda Layer compressed with Brotli.',
    link: {href: 'https://github.com/shelfio/chrome-aws-lambda-layer', label: 'github.com'},
  },
  {
    name: 'dynamodb-parallel-scan',
    description: 'Scan large DynamoDB tables faster with parallelism.',
    link: {href: 'https://github.com/shelfio/dynamodb-parallel-scan', label: 'github.com'},
  },
];

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>Projects - Vlad Holubiev</title>
        <meta name="description" content="Notable projects I've worked on over the years." />
      </Head>
      <SimpleLayout
        title="Notable projects I've worked on over the years."
        intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Most of them are open-source."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map(project => (
            <Card as="li" key={project.name} className="h-full">
              <div className="flex h-full flex-col">
                <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <Card.Link href={project.link.href} openInNewTab={true}>
                    {project.name}
                  </Card.Link>
                </h2>
                <Card.Description>{project.description}</Card.Description>
                <p className="group-hover:text-ua-blue-500 dark:group-hover:text-ua-blue-300 relative z-10 mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-zinc-400 transition dark:text-zinc-200">
                  <LinkIcon className="h-6 w-6 flex-none" />
                  <span>{project.link.label}</span>
                </p>
              </div>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
};

export default Projects;
