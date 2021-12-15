import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Newsletter from './Newsletter/Newsletter';
import styles from './Footer.module.scss';
import copyStringToClipboard from '../../utils/copyClipboard';
import { AppContext } from '../../utils/context/AppContext';

const Footer = ({ address, email, phone }) => {
  const emailRef = useRef();
  const { setIsToastVisible } = useContext(AppContext);

  const handleClickEmail = event =>
    copyStringToClipboard(event, email, setIsToastVisible);

  return (
    <footer className={styles.footer}>
      <div className={styles.studio}>
        <address aria-label="Amsterdam address" className={`${styles.address}`}>
          <span className={styles.name}>{'Random Amsterdam'}</span>
          <ReactMarkdown
            className={styles.location}
            escapeHtml={false}
            linkTarget="__blank"
            source={address}
          />
          <a
            aria-label="Phone number"
            className={styles.phone}
            href={`tel:${phone.replaceAll(' ', '')}`}
          >
            {phone}
          </a>
          <br />
          <a
            aria-label="Email address"
            className={styles.emailDesktop}
            href={`mailto:${email}`}
            onClick={handleClickEmail}
            ref={emailRef}
          >
            {email}
          </a>
          <a
            aria-label="Email address"
            className={styles.emailMobile}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </address>
        <address aria-label="Paris address" className={`${styles.address}`}>
          <span className={styles.name}>{'Random Paris'}</span>
          <div className={styles.location}>
            {'174 Quai de Jemmapes'}
            <br />
            {'75010 Paris'}
            <br />
            {'France'}
            <br />
            <a
              href="https://goo.gl/maps/8JhU7KsTLAaZZtGA9"
              rel="noreferrer"
              target="_blank"
            >
              {'Directions'}
            </a>
          </div>

          <a
            aria-label="Phone number"
            className={styles.phone}
            href="tel:+33140364144"
            type="tel"
          >
            {'+33 (0) 1 40 36 41 44'}
          </a>
          <br />
          <a
            aria-label="Email address"
            className={styles.emailDesktop}
            href="mailto:morgan.maccari@random.studio"
            onClick={handleClickEmail}
            ref={emailRef}
          >
            {'morgan.maccari@random.studio'}
          </a>
          <a
            aria-label="Email address"
            className={styles.emailMobile}
            href="mailto:morgan.maccari@random.studio"
          >
            {'morgan.maccari@random.studio'}
          </a>
        </address>
      </div>
      <div className={styles.column}>
        <Newsletter />

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
    </footer>
  );
};

Footer.propTypes = {
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Footer;
