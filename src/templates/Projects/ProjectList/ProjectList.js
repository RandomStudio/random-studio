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
  // Was previously constructed dynamically but because the filterList has to be ordered in a certain way we have to hardcode it
  // const filterList = [...new Set([...projectFilters])];
  const filterList = [
    'Spatial Experience',
    'Interactive Installation',
    'Spatial Design',
    'Exhibition & Event Design',
    'Digital Partnership',
    'Research & Design',
  ];
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
