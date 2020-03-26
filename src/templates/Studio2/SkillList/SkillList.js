import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillList.module.scss';

const SkillList = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Our capabilities</h3>
      <ul className={styles.listWrapper}>
        <li>list</li>
      </ul>
    </div>
  );
};

SkillList.propTypes = {};
SkillList.defaultProps = {};

export default SkillList;
