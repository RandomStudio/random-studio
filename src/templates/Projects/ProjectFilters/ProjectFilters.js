import React, { useEffect, useState } from 'react';
import styles from './ProjectFilters.module.scss';

const FILTERS = [
  'Spatial Experience',
  'Interactive Installation',
  'Exhibition Design',
  'Interior Design',
  'Window Installation',
  'Research & Development',
  'Digital Partnership',
];

const ProjectFilters = ({ projects }) => {
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    console.log(activeTag);
  }, [activeTag]);

  return (
    <div className={styles.wrapper}>
      {FILTERS.map((filter) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
  );
};

export default ProjectFilters;
