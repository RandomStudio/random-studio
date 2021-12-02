import React from 'react';
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
          {thumbnail && (
            <Project
              isHidden={index >= PROJECT_LIMIT}
              middle={middle}
              thumbnail={thumbnail}
              title={title}
              titleWidth
              slug={slug}
              index={index}
              projects={projects}
            />
          )}
          {article && (
            <ResearchBlock
              quote={article.quote}
              articleUrl={article.articleUrl}
            />
          )}
          {index === projects.length - 1 && (
            <div className={`${styles.seeMore}`}>
              <a href="/projects">{'See all projects'}</a>
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default ProjectList;
