import { useRouter } from 'next/router';
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import styles from './Filters.module.css';
import { ORDERED_TAGS } from '../../../CONSTANTS';
import { ProjectSummary } from '../../../types/types';

type FiltersProps = {
  activeTag?: string;
  projects: ProjectSummary[];
  setActiveTag: (tag?: string) => void;
};

const Filters = ({
  activeTag = undefined,
  projects,
  setActiveTag,
}: FiltersProps) => {
  const router = useRouter();
  const checkboxRef = useRef<HTMLInputElement>(null);

  const projectFilters = useMemo(() => {
    const projectFiltersWithDupes = projects
      .map(({ tags }) => tags)
      .filter(Boolean)
      .flat()
      .map(tag => tag.toLowerCase());

    return [...new Set(projectFiltersWithDupes)];
  }, [projects]);

  useEffect(() => {
    const requestedFilter = router.query.filter as string;

    if (requestedFilter && projectFilters.includes(requestedFilter)) {
      setActiveTag(requestedFilter);
    }
  }, [projectFilters, router.query.filter, setActiveTag]);

  const handleSelectFilter = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      const filter = currentTarget.id;
      const tag = filter === activeTag ? undefined : filter;
      setActiveTag(tag);

      router.replace(`/projects${tag ? `?filter=${tag}` : ''}`);

      if (!checkboxRef.current) {
        return;
      }

      checkboxRef.current.checked = false;
    },
    [activeTag, router, setActiveTag],
  );

  const createClasses = (filter: string) =>
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

export default Filters;
