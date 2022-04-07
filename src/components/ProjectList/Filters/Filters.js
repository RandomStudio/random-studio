import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { PROJECT_FILTERS } from '../../../CONSTANTS';
import styles from './Filters.module.scss';
import classNames from '../../../utils/classNames';

const LOWERCASE_PROJECT_FILTESR = PROJECT_FILTERS.map(filter =>
  filter.toLowerCase(),
);

const Filters = ({ filterCount, activeTag, setActiveTag }) => {
  const router = useRouter();
  const checkboxRef = useRef();

  useEffect(() => {
    const requestedFilter = router.query.filter;

    if (
      requestedFilter &&
      LOWERCASE_PROJECT_FILTESR.includes(requestedFilter)
    ) {
      setActiveTag(requestedFilter);
    }
  }, [router.query.filter, setActiveTag]);

  const filters = useMemo(() => {
    const filtersWithEntries = LOWERCASE_PROJECT_FILTESR.filter(
      filter => (filterCount?.[filter] ?? 0) > 0,
    );

    const handleSelectFilter = ({ target }) => {
      const filter = target.id;
      const tag = filter === activeTag ? null : filter;
      setActiveTag(tag);

      router.replace(`/projects${tag ? `?filter=${tag}` : ''}`);
      checkboxRef.current.checked = false;
    };

    const createClasses = filter =>
      classNames({
        [styles.entry]: true,
        [styles.activeFilter]: activeTag !== null,
        [styles.activeTag]: filter === activeTag,
      });

    return filtersWithEntries.map(filter => (
      <button
        aria-pressed={filter === activeTag}
        className={createClasses(filter)}
        id={filter}
        key={filter}
        onClick={handleSelectFilter}
        style={{
          '--count': filterCount[filter],
        }}
        type="button"
      >
        {filter}
      </button>
    ));
  }, [activeTag, filterCount, router, setActiveTag]);

  return (
    <>
      <input
        className={styles.checkbox}
        id="checkbox"
        ref={checkboxRef}
        type="checkbox"
      />

      <label className={styles.accordionTitle} htmlFor="checkbox">
        <p>{activeTag !== null ? activeTag : 'All Projects'}</p>
      </label>

      <ul
        aria-label="Category filters"
        className={styles.filters}
        role="navigation"
      >
        {filters}
      </ul>
    </>
  );
};

Filters.propTypes = {
  activeTag: PropTypes.string,
  filterCount: PropTypes.objectOf(PropTypes.number).isRequired,
  setActiveTag: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  activeTag: null,
};

export default Filters;
