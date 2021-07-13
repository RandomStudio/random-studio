import React from 'react';
import styles from './Logo.module.scss';

const Logo = () => (
  <h1 className={`${styles.logo}`}>
    {'Random'}
    <br />
    {'Studio'}
  </h1>
);

export default Logo;
