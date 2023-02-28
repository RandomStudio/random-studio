import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';

const Navigation = ({ isLogoCentred }) => (
  <nav aria-label="Site navigation" className={styles.nav} role="navigation">
    <Logo isCentred={isLogoCentred} />

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

Navigation.propTypes = {
  isLogoCentred: PropTypes.bool.isRequired,
};

export default Navigation;
