import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import Logo from '../Logo/Logo';

const Navigation = ({ layout }) => (
  <nav aria-label="Site navigation" className={styles.nav} role="navigation">
    <Logo layout={layout} />
    <Link href="/projects">
      <a className={styles.link}>{'Projects'}</a>
    </Link>
    <Link href="/studio">
      <a className={styles.link}>{'Studio'}</a>
    </Link>
  </nav>
);

export default Navigation;
