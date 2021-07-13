import React from 'react';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';

const ProjectList = ({ middle, projects }) => (
  <div className={styles.projects}>
    {projects.map(({ thumbnail, title, slug }, index) => {
      return (
        <React.Fragment key={slug}>
          {thumbnail && (
            <Project
              isHidden={index >= 6}
              middle={middle}
              thumbnail={thumbnail}
              title={title}
              titleWidth
              slug={slug}
              index={index}
              projects={projects}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default ProjectList;
