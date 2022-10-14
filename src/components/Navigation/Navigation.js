import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';

const Navigation = ({ isLogoCentred }) => (
  <nav aria-label="Site navigation" className={styles.nav} role="navigation">
    <Logo isCentred={isLogoCentred} />

    <div className={styles.links}>
      <Link href="/projects">
        <a className={styles.link}>{'Projects'}</a>
      </Link>

      <Link href="/studio">
        <a className={styles.link}>{'Studio'}</a>
      </Link>
    </div>
  </nav>
);

Navigation.propTypes = {
  isLogoCentred: PropTypes.bool.isRequired,
};

export default Navigation;
