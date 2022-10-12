import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toast.module.css';

const Toast = ({ isVisible }) => {
  return (
    <div className={`${styles.notice} ${isVisible && styles.isVisible}`}>
      Copied to clipboard
    </div>
  );
};

Toast.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Toast;
