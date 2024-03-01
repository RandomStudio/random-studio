import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntermittentBlock.module.scss';

const ResearchBlock = ({ quote, articleUrl }) => (
  <div className={`${styles.wrapper} ${styles.researchBlock}`}>
    <h3>{'Research'}</h3>
    <q>{quote}</q>
    {articleUrl && (
      <p>
        <a href={articleUrl}>{'Read More'}</a>
      </p>
    )}
  </div>
);

ResearchBlock.propTypes = {
  quote: PropTypes.string.isRequired,
  articleUrl: PropTypes.string,
};

ResearchBlock.defaultProps = {
  articleUrl: '',
};

export default ResearchBlock;
