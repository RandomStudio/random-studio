import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.scss';
import classNames from '../../../utils/classNames';
import { projectPropType } from '../../../propTypes';
import { ORDERED_TAGS } from '../../../CONSTANTS';

const Filters = ({ activeTag, projects, setActiveTag }) => {
  const router = useRouter();
  const checkboxRef = useRef();

  const projectFilters = useMemo(() => {
    const projectFiltersWithDupes = projects
      .map(({ tags }) => tags)
      .filter(Boolean)
      .flat()
      .map(tag => tag.toLowerCase());

    return [...new Set(projectFiltersWithDupes)];
  }, [projects]);

  useEffect(() => {
    const requestedFilter = router.query.filter;

    if (requestedFilter && projectFilters.includes(requestedFilter)) {
      setActiveTag(requestedFilter);
    }
  }, [projectFilters, router.query.filter, setActiveTag]);

  const handleSelectFilter = useCallback(
    ({ target }) => {
      const filter = target.id;
      const tag = filter === activeTag ? null : filter;
      setActiveTag(tag);

      router.replace(`/projects${tag ? `?filter=${tag}` : ''}`);
      checkboxRef.current.checked = false;
    },
    [activeTag, router, setActiveTag],
  );

  const createClasses = filter =>
    classNames({
      [styles.entry]: true,
      [styles.activeFilter]: activeTag !== null,
      [styles.activeTag]: filter === activeTag,
    });

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
        {ORDERED_TAGS.map(filter => (
          <button
            aria-pressed={filter === activeTag}
            className={createClasses(filter)}
            id={filter}
            key={filter}
            onClick={handleSelectFilter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </ul>
    </>
  );
};

Filters.propTypes = {
  activeTag: PropTypes.string,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  setActiveTag: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  activeTag: null,
};

export default Filters;
