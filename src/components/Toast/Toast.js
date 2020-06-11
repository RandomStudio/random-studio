import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Toast.module.scss';
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
  copy: PropTypes.string.isRequired,
};

export default Toast;
