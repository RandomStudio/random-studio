import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './ProjectList.module.scss';
import Filters from './Filters/Filters';
import Project from '../Project/Project';
import { HOMEPAGE_POSTS_LIMIT, LAYOUT, ORDERED_TAGS } from '../../CONSTANTS';
import Crossfade from '../Crossfade/Crossfade';
import { projectPropType } from '../../propTypes';
import Markdown from '../Markdown/Markdown';

const ProjectList = ({ hasFilters, hasLimit, intro, projects }) => {
  const [activeTag, setActiveTag] = useState(null);

  const activeTagIndex =
    ORDERED_TAGS.findIndex(tag => tag === activeTag) + 1 ?? 0;

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
          projects={projects}
          setActiveTag={setActiveTag}
        />
      )}

      <ul aria-label="Highlighted projects" className={styles.projects}>
        {intro && (
          <div className={styles.statement}>
            <Markdown markdown={intro} />
          </div>
        )}

        <Crossfade>
          <React.Fragment key={activeTag ?? 'all'}>
            {visibleProjects.map(
              ({ featuredImage, featuredVideo, title, slug }, projectIndex) => {
                const index = projectIndex + activeTagIndex;
                const { left, top, width } = LAYOUT[index % LAYOUT.length];

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
            <Link href="/projects#continued">{'See all projects'}</Link>
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
