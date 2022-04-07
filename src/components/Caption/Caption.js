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
      <ReactMarkdown>{caption}</ReactMarkdown>

      <ReactMarkdown>{carouselIndicator}</ReactMarkdown>
    </div>
  );
};

Caption.propTypes = {
  caption: PropTypes.string,
  carouselIndicator: PropTypes.string,
  marginLeft: PropTypes.number,
};

Caption.defaultProps = {
  caption: '',
  carouselIndicator: '',
  marginLeft: null,
};

export default Caption;
