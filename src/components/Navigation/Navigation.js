import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.nav}>
    <Link href="/projects">
      <a>{'Projects'}</a>
    </Link>
    <Link href="/studio">
      <a>{'Studio'}</a>
    </Link>
  </nav>
);

export default Navigation;
