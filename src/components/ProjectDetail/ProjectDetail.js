import React from 'react';
import ReactMarkdown from 'react-markdown';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import ContentBlock from './ContentBlock/ContentBlock';
import BackScrim from './BackScrim/BackScrim';
import { projectPropTypeObject } from '../../propTypes';

const ProjectDetail = ({
  title,
  intro,
  content,
  details,
  relatedProjects,
  relatedProjectsTitle,
}) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>
        <ReactMarkdown>{title.replace('<br>', '\n\n')}</ReactMarkdown>
      </h1>

      <div className={styles.intro}>
        <ReactMarkdown>{intro}</ReactMarkdown>
      </div>

      {content?.map(block => (
        <ContentBlock block={block} key={block.id} />
      ))}

      {relatedProjects && relatedProjects.length > 0 && (
        <RelatedProjectSlider
          relatedProjects={relatedProjects}
          relatedProjectsTitle={relatedProjectsTitle}
        />
      )}

      <dl aria-label="Project Details" className={styles.credits}>
        {Object.entries(details ?? {})?.map(([key, value]) => (
          <React.Fragment key={`${key}-${value}`}>
            <dt>{`${key}:`}</dt>

            <dd>
              {value.replaceAll('<br />', '<br>').replaceAll('<br>', '\n')}
            </dd>
          </React.Fragment>
        ))}
      </dl>

      <BackScrim />
    </div>
  );
};

ProjectDetail.propTypes = projectPropTypeObject;

ProjectDetail.defaultProps = {
  relatedProjects: null,
};

export default ProjectDetail;
