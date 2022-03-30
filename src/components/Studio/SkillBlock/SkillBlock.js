import Email from '../../Email/Email';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './SkillBlock.module.scss';
import SkillList from './SkillList/SkillList';

const SkillBlock = ({ skillset }) => (
  <div className={styles.wrapper}>
    <SkillList skillset={skillset} />
    <div className={styles.conversationWrapper}>
      <p>{'Start a conversation'}</p>
      <Email />
    </div>
  </div>
);

SkillBlock.propTypes = {
  skillset: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillBlock;
