/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { PROJECT_FILTER_LIST } from '../Projects/ProjectList/ProjectList';

const Filters = ({ filterCount, filterList, activeTag, setActiveTag }) => {
  // Disable for server side rendering
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchParameterEntries = Object.fromEntries(
      new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      ).entries(),
    );

    if (
      searchParameterEntries &&
      PROJECT_FILTER_LIST.includes(searchParameterEntries?.filter)
    ) {
      setActiveTag(searchParameterEntries.filter);
    }
  }, []);

  useEffect(() => {
    // Disable for server side rendering
    if (typeof window === 'undefined') {
      return;
    }

    if (activeTag === null) {
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    const searchParameters = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : '',
    );
    searchParameters.set('filter', activeTag);
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${searchParameters}`,
    );
  }, [activeTag]);

  const handleSelectFilter = filter => {
    setActiveTag(filter === activeTag ? null : filter);
  };

  const filtersWithEntries = filterList.filter(
    filter => (filterCount?.[filter] ?? 0) > 0,
  );
  return (
    <>
      <div className={styles.filters}>
        {filtersWithEntries.map(filter => (
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
          filtersWithEntries.map(filter => (
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
