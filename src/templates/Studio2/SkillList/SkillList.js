import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillList.module.scss';

const SkillList = ({ skillsets }) => {
  return (
    <div className={styles.wrapper}>
      <h3>Our capabilities</h3>
      <ul className={styles.listWrapper}>
        {skillsets.map(skillset => (
          <li key={skillset}>{skillset}</li>
        ))}
      </ul>
    </div>
  );
};

SkillList.propTypes = {
  skillsets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillList;
