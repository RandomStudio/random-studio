import styles from './Toast.module.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({ isVisible, copy }) => (
  <div className={`${styles.notice} ${isVisible && styles.noticeIsVisible}`}>
    {copy}
  </div>
);

  Toast.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    copy: PropTypes.string.isRequired,
  }

export default Toast;
