import React from 'react';
import styles from './SeeMore.module.scss';

const SeeMore = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <a href="/projects">{'See all projects'}</a>
    </div>
  );
};

SeeMore.propTypes = {};

SeeMore.defaultProps = {};

export default SeeMore;
