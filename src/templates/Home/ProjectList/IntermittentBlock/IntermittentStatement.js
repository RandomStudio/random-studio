import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './IntermittentBlock.module.scss';

const IntermittentStatement = ({ middle }) => (
  <div className={`${styles.wrapper} ${styles.statementBlock}`}>
    <ReactMarkdown escapeHtml={false} source={middle} />
  </div>
);

IntermittentStatement.propTypes = {
  middle: PropTypes.string.isRequired,
};

export default IntermittentStatement;
