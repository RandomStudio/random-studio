import React from 'react';
import { Link } from 'next/link';
import styles from './Logo.module.scss';

const Logo = ({ layout }) => {
  const logoClass = `${styles.logo} ${
    layout === 'center' ? styles.isCenter : styles.isTop
  }`;

  return (
    <h1 className={logoClass}>
      <Link to="/">
        {'Random'}
        <br />
        {'Studio'}
      </Link>
    </h1>
  );
};

export default Logo;
