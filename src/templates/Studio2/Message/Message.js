import React from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.scss';

const Message = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
