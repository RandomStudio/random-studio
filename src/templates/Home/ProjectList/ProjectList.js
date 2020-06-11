import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';
import ResearchBlock from './IntermittentBlock/ResearchBlock';
import IntermittentStatement from './IntermittentBlock/IntermittentStatement';

const ProjectList = ({
  intro, middle, projects, articles,
}) => (
  <div id="projects" className={styles.projects}>
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
              middle={middle}
              thumbnail={thumbnail}
              title={title}
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
          {(index === 3 || (projects.length < 3 && index === projects.length - 1)) && (
            <IntermittentStatement middle={middle} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default ProjectList;
