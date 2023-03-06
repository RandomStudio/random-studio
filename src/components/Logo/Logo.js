import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';

const Logo = ({ isCentred }) => {
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

Logo.propTypes = {
  isCentred: PropTypes.bool.isRequired,
};

export default Logo;
