import React from 'react';
import styles from './Footer.module.css';
import Address from './Address/Address';
import Email from './Email/Email';
import Newsletter from './Newsletter/Newsletter';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.studio}>
      <Address
        address={[
          'Gillis van Ledenberchstraat 112',
          '1052 VK Amsterdam',
          'The Netherlands',
        ]}
        aria="Amsterdam address"
        className={styles.address}
        directions="https://goo.gl/maps/2sJnCcLummnmvrVb9"
        name="Random Amsterdam"
        phone="+31 20 779 7735"
      />

      <Address
        address={['174 Quai de Jemmapes', '75010 Paris', 'France']}
        aria="Paris address"
        className={styles.address}
        directions="https://goo.gl/maps/8JhU7KsTLAaZZtGA9"
        name="Random Paris"
        phone="+33 1 40 36 41 44"
      />
    </div>

    <div className={styles.emails}>
      {[
        'business@random.studio',
        'press@random.studio',
        'hello@random.studio',
      ].map(email => (
        <Email className={styles.email} email={email} key={email} />
      ))}
    </div>

    <div className={styles.rightColumn}>
      <a
        className={styles.bcorp}
        href="https://www.bcorporation.net/en-us/find-a-b-corp/company/random-studio"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt="Arrow pointing down. Indicating more content further down."
          src="/icons/bcorp.svg"
        />
      </a>

      <div className={styles.column}>
        <Newsletter className={styles.newsletter} />

        <nav aria-label="Social media profiles" className={styles.socials}>
          <a
            className={styles.social}
            href="https://instagram.com/random_studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {'Instagram'}
          </a>

          <a
            className={styles.social}
            href="https://www.linkedin.com/company/random-studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {'LinkedIn'}
          </a>

          <a
            className={styles.social}
            href="https://medium.com/random-studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {'Medium'}
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
