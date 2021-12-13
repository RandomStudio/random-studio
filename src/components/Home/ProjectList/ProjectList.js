import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectList.module.scss';
import Project from '../../Projects/ProjectList/Project/Project';
import ResearchBlock from './IntermittentBlock/ResearchBlock';

const PROJECT_LIMIT = 6;

const ProjectList = ({ intro, middle, projects, articles }) => (
  <div className={styles.projects}>
    <div className={styles.statement}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {projects.map(({ thumbnail, title, slug }, index) => {
      const article = (articles || []).find(
        ({ position }) => position === index + 1,
      );

      return (
        <React.Fragment key={slug}>
          {thumbnail && index < PROJECT_LIMIT && (
            <Project
              index={index}
              middle={middle}
              projects={projects}
              slug={slug}
              thumbnail={thumbnail}
              title={title}
              titleWidth
            />
          )}
          {article && (
            <ResearchBlock
              articleUrl={article.articleUrl}
              quote={article.quote}
            />
          )}
          {index === projects.length - 1 && (
            <div className={`${styles.seeMore}`}>
              <Link href="/projects">
                <a>{'See all projects'}</a>
              </Link>
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default ProjectList;
