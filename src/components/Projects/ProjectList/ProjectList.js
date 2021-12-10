import React, { useState } from 'react';
import { countBy } from 'lodash';
import styles from './ProjectList.module.scss';
import Project from './Project/Project';
import Filters from '../../Filters/Filters';

export const PROJECT_FILTER_LIST = [
  'Spaces',
  'Installations',
  'Exhibitions',
  'Research',
  'Digital',
];

const ProjectList = ({ middle, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat();
  // Was previously constructed dynamically but because the filterList has to be ordered in a certain way we have to hardcode it
  // const filterList = [...new Set([...projectFilters])];

  const filterCount = countBy(projectFilters);

  const [activeTag, setActiveTag] = useState(null);

  return (
    <>
      <Filters
        filterList={PROJECT_FILTER_LIST}
        filterCount={filterCount}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

      <div className={styles.projects}>
        {projects.map(({ thumbnail, title, slug, tags }, index) => {
          const isHidden = activeTag !== null && !tags?.includes(activeTag);

          if (!thumbnail || isHidden) {
            return null;
          }

          return (
            <Project
              index={index}
              key={slug}
              middle={middle}
              projects={projects}
              slug={slug}
              thumbnail={thumbnail}
              title={title}
              titleWidth
            />
          );
        })}
      </div>
    </>
  );
};

export default ProjectList;
