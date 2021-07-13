import React, { useState } from 'react';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';

const FILTERS = [
  'Spatial Experience',
  'Interactive Installation',
  'Exhibition Design',
  'Interior Design',
  'Window Installation',
  'Research & Development',
  'Digital Partnership',
];

const ProjectList = ({ middle, projects }) => {
  const [activeTag, setActiveTag] = useState(null);

  return (
    <>
      <div className={styles.filters}>
        {FILTERS.map((filter) => (
          <div
            className={`${styles.filter} ${
              filter === activeTag && styles.active
            }`}
            onClick={() => setActiveTag(filter === activeTag ? null : filter)}
            key={filter}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className={styles.projects}>
        {projects.map(({ thumbnail, title, slug, tags }, index) => {
          return (
            <React.Fragment key={slug}>
              {thumbnail && (
                <Project
                  isHidden={activeTag !== null && !tags.includes(activeTag)}
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
    </>
  );
};

export default ProjectList;
