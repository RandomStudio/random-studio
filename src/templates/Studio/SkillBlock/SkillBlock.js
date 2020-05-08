import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './SkillBlock.module.scss';
import SkillList from './SkillList/SkillList';
import { copyStringToClipboard } from '../../../utils/copyClipboard';

const SkillBlock = ({ skillset, email }) => {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const emailRef = useRef();

  const handleClickEmail = event =>
    copyStringToClipboard(event, email, setIsNoticeVisible);

  return (
    <div className={styles.wrapper}>
      <SkillList skillset={skillset} />

      <div className={styles.conversationWrapper}>
        <p>Start a conversation</p>
        <a href={`mailto:${email}`} onClick={handleClickEmail} ref={emailRef}>
          Contact Us
        </a>
      </div>

      <div
        className={`${styles.notice} ${isNoticeVisible &&
          styles.noticeIsVisible}`}
      >
        Copied to clipboard
      </div>
    </div>
  );
};

SkillBlock.propTypes = {
  skillset: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

export default SkillBlock;
