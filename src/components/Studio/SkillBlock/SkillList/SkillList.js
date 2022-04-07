import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillList.module.scss';

const SkillList = ({ skillset }) => (
  <div className={styles.wrapper}>
    <h3>{'Our capabilities'}</h3>

    <ul className={styles.listWrapper}>
      {skillset.map(skill => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </div>
);

SkillList.propTypes = {
  skillset: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillList;
