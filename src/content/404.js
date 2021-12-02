import React from 'react';
import Link from 'next/link';
import styles from './404.module.scss';
import Layout from '../components/Layout/Layout';

const Error404 = () => (
  <Layout>
    <main className={styles.notFoundPage}>
      <div>
        {'Page not found'}
        {' '}
        <br />
        {'View our'}
        {' '}
        <Link href="/projects"><a>
          {'projects'}
        </a>
        </Link>
      </div>
    </main>
  </Layout>
);

export default Error404;
