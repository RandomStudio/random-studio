import React, { useState, useEffect } from 'react';
import styles from './Filters.module.scss';

const Filters = ({ filterCount, filterList, activeTag, setActiveTag }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.filters}>
        {filterList.map((filter) => (
          <div
            className={`${styles.filterEntry} ${
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

      <div className={styles.accordion}>
        <div className={styles.accordionLabel}>
          {activeTag !== null ? activeTag : 'All Projects'}
          <div
            className={`${styles.accordionIcon}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              alt={isOpen ? 'open' : 'close'}
              className={styles.icon}
              src={
                isOpen ? '/img/icons/arrow-up.svg' : '/img/icons/arrow-down.svg'
              }
            />
          </div>
        </div>
        {isOpen &&
          filterList.map((filter) => (
            <span
              value={filter}
              className={`${styles.accordionEntry} ${
                activeTag !== null ? styles.activeFilter : ''
              } ${filter === activeTag ? styles.activeTag : ''}`}
              onClick={() => {
                setActiveTag(filter === activeTag ? null : filter);
                setIsOpen(false);
              }}
              key={filter}
              style={{
                '--opacity': isOpen ? 1 : 0,
              }}
            >
              {filter}{' '}
              <span className={styles.filterCount}> {filterCount[filter]}</span>
            </span>
          ))}
      </div>
    </>
  );
};

export default Filters;
