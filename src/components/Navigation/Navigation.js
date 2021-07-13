import React from 'react';
import { Link } from 'gatsby';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <>
    <nav className={styles.nav}>
      <Link to="/projects">{'Projects'}</Link>
      <Link to="/studio">{'Studio'}</Link>
    </nav>

    <h1 className={`${styles.logo}`}>
      {'Random'}
      <br />
      {'Studio'}
    </h1>
  </>
);

export default Navigation;
