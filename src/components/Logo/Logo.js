import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';

const Logo = ({ isCentred }) => {
  const centeredClass = isCentred ? styles.isCenter : styles.isTop;
  const logoClass = `${styles.logo} ${centeredClass}`;

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
