import PropTypes from 'prop-types';
import React from 'react';
import Email from './Email/Email';
import styles from './Address.module.css';

const Address = ({
  address,
  aria,
  className,
  directions,
  email,
  name,
  phone,
}) => (
  <address aria-label={aria} className={`${styles.address} ${className}`}>
    <span className={styles.name}>{name}</span>

    <div className={styles.location}>
      {address.map(line => (
        <React.Fragment key={line}>
          {line}

          <br />
        </React.Fragment>
      ))}

      <a href={directions} rel="noreferrer" target="_blank">
        {'Directions'}
      </a>
    </div>

    <a
      aria-label="Phone number"
      className={styles.phone}
      href={`tel:${phone.replaceAll(' ', '')}`}
    >
      {phone}
    </a>

    <br />

    {email && <Email className={styles.email} email={email} />}
  </address>
);

Address.propTypes = {
  address: PropTypes.arrayOf(PropTypes.string).isRequired,
  aria: PropTypes.string.isRequired,
  className: PropTypes.string,
  directions: PropTypes.string.isRequired,
  email: PropTypes.string,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

Address.defaultProps = {
  className: '',
  email: null,
};

export default Address;
