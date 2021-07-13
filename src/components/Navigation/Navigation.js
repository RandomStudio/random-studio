import React from 'react';
import { Link } from 'gatsby';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <>
    <nav className={styles.nav}>
      <Link to="/projects">{'Projects'}</Link>
      <Link to="/studio">{'Studio'}</Link>
    </nav>
  </>
);

export default Navigation;
