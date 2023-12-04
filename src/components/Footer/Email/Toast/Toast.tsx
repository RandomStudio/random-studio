import React from 'react';
import styles from './Toast.module.css';

type ToastProps = {
  isVisible: boolean;
};

const Toast = ({ isVisible }: ToastProps) => (
  <div className={`${styles.notice} ${isVisible && styles.isVisible}`}>
    {'Copied to clipboard'}
  </div>
);

export default Toast;
