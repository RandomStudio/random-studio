import React from 'react';
import { Link } from 'gatsby';
import styles from './404.module.scss';
import Layout from '../components/Layout/Layout';
import Navigation from '../components/Navigation/Navigation';

const Error404 = () => (
  <Layout>
    <main className={styles.notFoundPage}>
      <div>
        Page not found <br />
        View our <Link to="/#projects">projects</Link>
      </div>
    </main>
  </Layout>
);

export default Error404;
