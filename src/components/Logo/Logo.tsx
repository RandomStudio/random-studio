import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.css';

type LogoProps = {
  isCentred: boolean;
};

const Logo = ({ isCentred }: LogoProps) => {
  const centredClass = isCentred ? styles.isCentre : styles.isTop;
  const logoClass = `${styles.logo} ${centredClass}`;

  return (
    <h1 className={logoClass}>
      <Link href="/">
        {'Random '}

        <br aria-hidden />

        {'Studio'}
      </Link>
    </h1>
  );
};

export default Logo;
