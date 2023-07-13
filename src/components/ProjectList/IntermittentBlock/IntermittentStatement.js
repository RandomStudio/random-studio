import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntermittentBlock.module.scss';
import Markdown from '../../Markdown/Markdown';

const IntermittentStatement = ({ middle }) => (
  <div className={`${styles.wrapper} ${styles.statementBlock}`}>
    <Markdown markdown={middle} />
  </div>
);

IntermittentStatement.propTypes = {
  middle: PropTypes.string.isRequired,
};

export default IntermittentStatement;
