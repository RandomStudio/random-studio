import React, { useState } from 'react';
import { countBy } from 'lodash';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';

const ProjectList = ({ middle, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat();
  const filters = [...new Set([...projectFilters])];
  const filterCount = countBy(projectFilters);
  const [activeTag, setActiveTag] = useState(null);

  console.log(filterCount);

  return (
    <>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <div
            className={`${styles.filter} ${
              filter === activeTag && styles.active
            }`}
            onClick={() => setActiveTag(filter === activeTag ? null : filter)}
            key={filter}
          >
            {filter} {filterCount[filter]}
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
