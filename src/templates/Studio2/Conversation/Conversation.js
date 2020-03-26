import React from 'react';
import PropTypes from 'prop-types';
import styles from './Conversation.module.scss';

const Converstation = ({ email }) => {
  return (
    <div className={styles.wrapper}>
      <p>Start a converstation</p>
      <a href={`mailto:${email}`}>Contact Us</a>
    </div>
  );
};

Converstation.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Converstation;
