import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        {'Random '}

        <span className={styles.break} aria-hidden />

        {'Studio'}
      </Link>
    </h1>
  );
};

export default Logo;
