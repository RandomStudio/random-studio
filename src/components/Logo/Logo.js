import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo = ({ layout }) => {
  const logoClass = `${styles.logo} ${layout === 'center' ? styles.isCenter : styles.isTop
    }`;

  return (
    <h1 className={logoClass}>
      <Link href="/">
        <a>
          {'Random '}
          <br aria-hidden />
          {'Studio'}
        </a>
      </Link>
    </h1>
  );
};

export default Logo;
