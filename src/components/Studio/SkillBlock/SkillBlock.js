import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './SkillBlock.module.scss';
import SkillList from './SkillList/SkillList';
import { copyStringToClipboard } from '../../../utils/copyClipboard';
import { AppContext } from '../../../utils/context/AppContext';

const SkillBlock = ({ skillset, email }) => {
  const emailRef = useRef();
  const { setIsToastVisible } = useContext(AppContext);

  const handleClickEmail = event => copyStringToClipboard(event, email, setIsToastVisible);

  return (
    <div className={styles.wrapper}>
      <SkillList skillset={skillset} />

      <div className={styles.conversationWrapper}>
        <p>{'Start a conversation'}</p>
        <a href={`mailto:${email}`} onClick={handleClickEmail} ref={emailRef}>
          {'Contact Us'}
        </a>
      </div>
    </div>
  );
};

SkillBlock.propTypes = {
  skillset: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

export default SkillBlock;
