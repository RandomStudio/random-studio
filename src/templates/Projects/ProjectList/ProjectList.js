import React, { useState } from 'react';
import { countBy } from 'lodash';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';
import Filters from '../Filters/Filters';

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
      <Filters
        filterList={filterList}
        filterCount={filterCount}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

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
