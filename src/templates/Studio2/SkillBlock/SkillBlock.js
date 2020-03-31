import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillBlock.module.scss';

import SkillList from './SkillList/SkillList';
import Conversation from './Conversation/Conversation';

const SkillBlock = ({ skillset, email }) => {
  return (
    <div className={styles.wrapper}>
      <SkillList skillset={skillset} />
      <Conversation email={email} />

      <div className={styles.conversationWrapper}>
        <p>Start a converstation</p>
        <a href={`mailto:${email}`}>Contact Us</a>
      </div>
    </div>
  );
};

SkillBlock.propTypes = {};
SkillBlock.defaultProps = {};

export default SkillBlock;
