import React, { useMemo, useState } from 'react';
import { countBy } from 'lodash-es';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './ProjectList.module.scss';
import Filters from './Filters/Filters';
import Project from '../Project/Project';
import { HOMEPAGE_POSTS_LIMIT, LAYOUT } from '../../CONSTANTS';
import Crossfade from '../Crossfade/Crossfade';
import { projectPropType } from '../../propTypes';

const ProjectList = ({ hasFilters, hasLimit, intro, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat()
    .map(tag => tag.toLowerCase());
  // Was previously constructed dynamically but because the filterList has to be ordered in a certain way we have to hardcode it
  // const filterList = [...new Set([...projectFilters])];

  const filterCount = countBy(projectFilters);

  const [activeTag, setActiveTag] = useState(null);

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        ({ featuredImage, featuredVideo, tags }) =>
          (!activeTag || tags?.includes(activeTag.toLowerCase())) &&
          ((featuredVideo && featuredVideo !== '') || featuredImage),
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

        <Crossfade>
          <React.Fragment key={activeTag ?? 'all'}>
            {visibleProjects.map(
              ({ featuredImage, featuredVideo, title, slug }, index) => {
                const { left, top, width } = LAYOUT[index];

                return (
                  <React.Fragment key={slug}>
                    {!hasLimit && HOMEPAGE_POSTS_LIMIT === index && (
                      <div className={styles.continued} id="continued" />
                    )}

                    <Project
                      featuredImage={featuredImage}
                      featuredVideo={featuredVideo}
                      index={index}
                      left={left}
                      slug={slug}
                      title={title}
                      top={top}
                      width={width}
                    />
                  </React.Fragment>
                );
              },
            )}
          </React.Fragment>
        </Crossfade>

        {hasLimit && (
          <div className={styles.seeMore}>
            <Link href="/projects#continued">
              <a>{'See all projects'}</a>
            </Link>
          </div>
        )}
      </ul>
    </>
  );
};

ProjectList.propTypes = {
  hasFilters: PropTypes.bool,
  hasLimit: PropTypes.bool,
  intro: PropTypes.string,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
};

ProjectList.defaultProps = {
  hasFilters: false,
  hasLimit: false,
  intro: null,
};

export default ProjectList;
