import React, { useState } from 'react';
import { countBy } from 'lodash';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';

const ProjectList = ({ middle, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat();
  const filterList = [...new Set([...projectFilters])];
  const filterCount = countBy(projectFilters);

  const [activeTag, setActiveTag] = useState(null);

  return (
    <>
      <div className={styles.filters}>
        {filterList.map((filter) => (
          <div
            className={`${styles.filter} ${
              activeTag !== null ? styles.activeFilter : ''
            } ${filter === activeTag ? styles.activeTag : ''}`}
            onClick={() => setActiveTag(filter === activeTag ? null : filter)}
            key={filter}
          >
            {filter}{' '}
            <span className={styles.filterCount}> {filterCount[filter]}</span>
          </div>
        ))}
      </div>

      <div className={styles.projects}>
        {projects.map(({ thumbnail, title, slug, tags }, index) => {
          return (
            <React.Fragment key={slug}>
              {thumbnail && (
                <Project
                  isHidden={activeTag !== null && !tags?.includes(activeTag)}
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
