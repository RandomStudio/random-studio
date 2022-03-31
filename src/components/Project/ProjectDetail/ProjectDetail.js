import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import ContentBlock from './ContentBlock/ContentBlock';

const ProjectDetail = ({ title, intro, content, credits, relatedProjects }) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
      <div className={styles.intro}>
        <ReactMarkdown>{intro}</ReactMarkdown>
      </div>
      {content.map(block => (
        <ContentBlock {...block} key={block.id} />
      ))}
      {relatedProjects && (
        <RelatedProjectSlider relatedProjects={relatedProjects} />
      )}
      <dl aria-label="Project Details" className={styles.credits}>
        {(credits || []).map(({ key, value }) => (
          <React.Fragment key={`${key}-${value}`}>
            <dt>{key}</dt>
            <dd>
              <ReactMarkdown>{value}</ReactMarkdown>
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

ProjectDetail.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  credits: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  relatedProjects: PropTypes.shape({
    blockTitle: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.object),
  }),
  allProjects: PropTypes.arrayOf(PropTypes.object),
};

ProjectDetail.defaultProps = {
  allProjects: [],
  relatedProjects: null,
};

export default ProjectDetail;
