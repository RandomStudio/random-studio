import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PROJECT_FILTERS from '../PROJECT_FILTERS';
import styles from './Filters.module.scss';

const LOWERCASE_PROJECT_FILTESR = PROJECT_FILTERS.map(filter => filter.toLowerCase());

const Filters = ({ filterCount, activeTag, setActiveTag }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const requestedFilter = router.query.filter;

    if (
      requestedFilter &&
      LOWERCASE_PROJECT_FILTESR.includes(requestedFilter)
    ) {
      setActiveTag(requestedFilter);
    }
  }, [router.query.filter, setActiveTag]);

  const handleSelectFilter = filter => {
    const tag = filter === activeTag ? null : filter;
    setActiveTag(tag);

    router.replace(`/projects${tag ? `?filter=${tag}` : ''}`);
  };

  const filtersWithEntries = LOWERCASE_PROJECT_FILTESR.filter(
    filter => (filterCount?.[filter] ?? 0) > 0,
  );
  console.log(filterCount)
  return (
    <>
      <ul
        aria-label="Category filters"
        className={styles.filters}
        role="navigation"
      >
        {filtersWithEntries.map(filter => (
          <button
            aria-pressed={filter === activeTag}
            className={`${styles.filterEntry} ${activeTag !== null ? styles.activeFilter : ''
              } ${filter === activeTag ? styles.activeTag : ''}`}
            key={filter}
            onClick={() => {
              handleSelectFilter(filter);
            }}
            style={{
              '--count': filterCount[filter],
            }}
            type="button"
          >
            {filter}
          </button>
        ))}
      </ul>

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
              src={isOpen ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
            />
          </div>
        </div>
        {isOpen &&
          filtersWithEntries.map(filter => (
            <span
              className={`${styles.accordionEntry}`}
              key={filter}
              onClick={() => {
                handleSelectFilter(filter);
                setIsOpen(false);
              }}
              style={{
                '--opacity': isOpen ? 1 : 0,
              }}
              value={filter}
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
