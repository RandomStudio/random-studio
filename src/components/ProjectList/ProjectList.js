import React, { useMemo, useState } from 'react';
import { countBy } from 'lodash-es';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './ProjectList.module.scss';
import Filters from './Filters/Filters';
import LAYOUT from './LAYOUT';
import Project from '../Project/Project';

const ProjectList = ({ hasFilters, intro, limit, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat();
  // Was previously constructed dynamically but because the filterList has to be ordered in a certain way we have to hardcode it
  // const filterList = [...new Set([...projectFilters])];

  const filterCount = countBy(projectFilters);

  const [activeTag, setActiveTag] = useState(null);

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        ({ featuredImage, featuredVideo, tags }) =>
          (!activeTag || tags?.includes(activeTag)) &&
          (!!featuredVideo || !!featuredImage),
      ),
    [activeTag, projects],
  );

  return (
    <>
      {hasFilters && (
        <Filters
          activeTag={activeTag}
          filterCount={filterCount}
          setActiveTag={setActiveTag}
        />
      )}
      <ul aria-label="Highlighted projects" className={styles.projects}>
        {intro && (
          <div className={styles.statement}>
            <ReactMarkdown>{intro}</ReactMarkdown>
          </div>
        )}
        {visibleProjects.map(
          ({ featuredImage, featuredVideo, title, slug }, index) => {
            if (index >= limit) {
              return null;
            }

            const { left, top, width } = LAYOUT[index];

            return (
              <Project
                featuredImage={featuredImage}
                featuredVideo={featuredVideo}
                index={index}
                left={left}
                top={top}
                width={width}
                key={slug}
                slug={slug}
                title={title}
              />
            );
          },
        )}
        {limit && (
          <div className={styles.seeMore}>
            <Link href="/projects">
              <a>{'See all projects'}</a>
            </Link>
          </div>
        )}
      </ul>
    </>
  );
};

export default ProjectList;
