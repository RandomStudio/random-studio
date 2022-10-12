import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';

const Logo = ({ isCentred }) => {
  const logoClass = `${styles.logo} ${isCentred ? styles.isCenter : styles.isTop
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

Logo.propTypes = {
  isCentred: PropTypes.bool.isRequired,
};

export default Logo;
