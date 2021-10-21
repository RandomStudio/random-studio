/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { PROJECT_FILTER_LIST } from '../ProjectList/ProjectList';

const Filters = ({ filterCount, filterList, activeTag, setActiveTag }) => {
  const searchParameters =
    // Disable for server side rendering
    typeof window === 'undefined'
      ? new URLSearchParams('')
      : new URLSearchParams(window.location.search);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchParameterEntries = Object.fromEntries(
      searchParameters.entries(),
    );

    if (
      searchParameterEntries &&
      PROJECT_FILTER_LIST.includes(searchParameterEntries?.filter)
    ) {
      setActiveTag(searchParameterEntries.filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Disable for server side rendering
    if (typeof window === 'undefined') {
      return;
    }

    if (activeTag === null) {
      window.history.replaceState({}, '', `${window.location.pathname}`);
    } else {
      searchParameters.set('filter', activeTag);

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${searchParameters}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

  const handleSelectFilter = (filter) => {
    setActiveTag(filter === activeTag ? null : filter);
  };

  return (
    <>
      <div className={styles.filters}>
        {filterList.map((filter) => (
          <div
            className={`${styles.filterEntry} ${
              activeTag !== null ? styles.activeFilter : ''
            } ${filter === activeTag ? styles.activeTag : ''}`}
            onClick={() => {
              handleSelectFilter(filter);
            }}
            key={filter}
          >
            {filter}{' '}
            <span className={styles.filterCount}> {filterCount[filter]}</span>
          </div>
        ))}
      </div>

      <div className={styles.accordion}>
        <div
          className={styles.accordionLabel}
          onClick={() => setIsOpen(!isOpen)}
        >
          {activeTag !== null ? activeTag : 'All Projects'}
          <div className={`${styles.accordionIcon}`}>
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
              className={`${styles.accordionEntry}`}
              onClick={() => {
                handleSelectFilter(filter);
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
