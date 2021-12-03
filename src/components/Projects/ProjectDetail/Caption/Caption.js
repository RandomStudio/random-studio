import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './Caption.module.scss';

const Caption = ({ marginLeft, caption, carouselIndicator }) => {
  if (!caption && !carouselIndicator) {
    return null;
  }

  return (
    <div
      className={styles.caption}
      style={{ marginLeft: !marginLeft && '1.4rem' }}
    >
      <ReactMarkdown escapeHtml={false} source={caption} />
      <ReactMarkdown escapeHtml={false} source={carouselIndicator} />
    </div>
  );
};

Caption.propTypes = {
  marginLeft: PropTypes.number,
  caption: PropTypes.string,
};

export default Caption;
