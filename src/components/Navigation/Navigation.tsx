import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';

const Navigation = () => (
  <nav aria-label="Site navigation" className={styles.nav} role="navigation">
    <Logo />

    <div className={styles.links}>
      <Link className={styles.link} href="/projects">
        {'Projects'}
      </Link>

      <Link className={styles.link} href="/studio">
        {'Studio'}
      </Link>
    </div>
  </nav>
);

export default Navigation;
