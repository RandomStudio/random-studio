import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';

const ProjectList = ({ intro, middle, projects }) => (
  <div id="projects" className={styles.projects}>
    <div className={styles.statement}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {projects.map(
      ({ thumbnail, title, slug }, index) =>
        thumbnail && (
          <Project
            middle={middle}
            thumbnail={thumbnail}
            title={title}
            slug={slug}
            index={index}
            projects={projects}
          />
        ),
    )}
  </div>
);

export default ProjectList;
