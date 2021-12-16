import React, { useState } from 'react';
import { countBy } from 'lodash-es';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './ProjectList.module.scss';
import Filters from './Filters/Filters';
import PROJECT_FILTERS from './PROJECT_FILTERS';
import Project from '../Project/Project';
import ResearchBlock from './IntermittentBlock/ResearchBlock';

const ProjectList = ({ articles, hasFilters, intro, limit, projects }) => {
  const projectFilters = projects
    .map(({ tags }) => tags)
    .filter(Boolean)
    .flat();
  // Was previously constructed dynamically but because the filterList has to be ordered in a certain way we have to hardcode it
  // const filterList = [...new Set([...projectFilters])];

  const filterCount = countBy(projectFilters);

  const [activeTag, setActiveTag] = useState(null);

  return (
    <>
      {hasFilters && (
        <Filters
          activeTag={activeTag}
          filterCount={filterCount}
          filterList={PROJECT_FILTERS}
          setActiveTag={setActiveTag}
        />
      )}
      <ul aria-label="Highlighted projects" className={styles.projects}>
        {intro && (
          <div className={styles.statement}>
            <ReactMarkdown escapeHtml={false} source={intro} />
          </div>
        )}
        {projects.map(({ thumbnail, title, slug, tags }, index) => {
          const article = (articles || []).find(
            ({ position }) => position === index + 1,
          );

          const isHidden = activeTag !== null && !tags?.includes(activeTag);

          if (index >= limit) {
            return null;
          }

          return (
            <React.Fragment key={slug}>
              {thumbnail && !isHidden && (
                <Project
                  key={slug}
                  slug={slug}
                  thumbnail={thumbnail}
                  title={title}
                />
              )}
              {article && (
                <ResearchBlock
                  articleUrl={article.articleUrl}
                  quote={article.quote}
                />
              )}
              {limit && index === projects.length - 1 && (
                <div className={`${styles.seeMore}`}>
                  <Link href="/projects">
                    <a>{'See all projects'}</a>
                  </Link>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default ProjectList;
