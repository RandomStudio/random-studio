import React from 'react';
import PropTypes from 'prop-types';
import styles from './Conversation.module.scss';

const Converstation = ({ email }) => {
  return (
    <div className={styles.wrapper}>
      <p>Start a converstation</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
};

Converstation.propTypes = {};
Converstation.defaultProps = {};

export default Converstation;
