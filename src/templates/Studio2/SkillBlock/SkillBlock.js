import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillBlock.module.scss';
import SkillList from './SkillList/SkillList';

const SkillBlock = ({ skillset, email }) => {
  return (
    <div className={styles.wrapper}>
      <SkillList skillset={skillset} />

      <div className={styles.conversationWrapper}>
        <p>Start a converstation</p>
        <a href={`mailto:${email}`}>Contact Us</a>
      </div>
    </div>
  );
};

SkillBlock.propTypes = {
  skillset: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

export default SkillBlock;
