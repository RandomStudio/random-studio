import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './Caption.module.scss';

const Caption = ({ marginLeft, caption }) => {
  if (!caption) return null;

  return (
    <div
      className={styles.caption}
      style={{ marginLeft: !marginLeft && '1.4rem' }}
    >
      <ReactMarkdown escapeHtml={false} source={caption} />
    </div>
  );
};

Caption.propTypes = {
  marginLeft: PropTypes.string,
  caption: PropTypes.string,
};

export default Caption;
