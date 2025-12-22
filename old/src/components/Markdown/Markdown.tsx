import { ReactNode } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

const externalLinkRenderer = ({
  href,
  children,
}: {
  href?: string;
  children: ReactNode & ReactNode[];
}) => {
  const isInternalLink = href
    ? new URL(href).hostname.includes('random.studio')
    : false;

  return (
    <a
      href={href}
      rel={isInternalLink ? '' : 'noopener noreferrer'}
      target={isInternalLink ? '' : '_blank'}
    >
      {children}
    </a>
  );
};

type MarkdownProps = {
  className?: string;
  markdown: string;
};

const Markdown = ({ className = '', markdown }: MarkdownProps) => {
  const transformedMarkdown = markdown
    .replace('<br />', '<br>')
    .replace('<br>', '\n\n');

  return (
    <ReactMarkdown
      className={className}
      components={{ a: externalLinkRenderer }}
      rehypePlugins={[rehypeRaw]}
    >
      {transformedMarkdown}
    </ReactMarkdown>
  );
};

export default Markdown;
