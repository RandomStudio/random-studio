import dynamic from 'next/dynamic';
import React from 'react';
import styles from './PartyHeader.module.scss';

const LazyLoadedWorld = dynamic(() => import('./World/World'), {
  ssr: false,
});

const PartyHeader = () => {
  return (
    <div className={styles.frame}>
      <LazyLoadedWorld />
    </div>
  );
};

export default PartyHeader;
