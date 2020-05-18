import styles from './Toast.module.scss';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context/AppContext';

const Toast = ({ copy }) => {
  const { isToastVisible } = useContext(AppContext);

  return (
    <div
      className={`${styles.notice} ${isToastVisible && styles.noticeIsVisible}`}
    >
      {copy}
    </div>
  );
};

Toast.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  copy: PropTypes.string.isRequired,
};

export default Toast;
