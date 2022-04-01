import React from 'react';
import Email from '../../Email/Email';
import styles from './Address.module.scss';

const Address = ({ address, aria, directions, email, name, phone }) => (
  <address aria-label={aria} className={`${styles.address}`}>
    <span className={styles.name}>{name}</span>
    <div className={styles.location}>
      {address.map(line => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
      <a
        href={directions}
        rel="noreferrer"
        target="_blank"
      >
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
    {email && <Email email={email} />}
  </address >
);

export default Address;
