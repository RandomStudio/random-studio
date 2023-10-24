import React from 'react';
import styles from './Address.module.css';

type AddressProps = {
  address: string[];
  aria: string;
  className?: string;
  directions: string;
  name: string;
  phone: string;
};

const Address = ({
  address,
  aria,
  className = '',
  directions,
  name,
  phone,
}: AddressProps) => (
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
  </address>
);

export default Address;
