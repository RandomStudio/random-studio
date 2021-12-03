import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Newsletter from './Newsletter/Newsletter';
import styles from './Footer.module.scss';
import { copyStringToClipboard } from '../../utils/copyClipboard';
import { AppContext } from '../../utils/context/AppContext';

const Footer = ({ address, email, phone }) => {
  const emailRef = useRef();
  const { setIsToastVisible } = useContext(AppContext);

  const handleClickEmail = event =>
    copyStringToClipboard(event, email, setIsToastVisible);

  return (
    <footer className={styles.footer}>
      <div className={styles.studio}>
        <div className={`${styles.address}`}>
          <span className={styles.name}>Random Amsterdam</span>
          <ReactMarkdown
            className={styles.location}
            escapeHtml={false}
            linkTarget="__blank"
            source={address}
          />
          <a className={styles.phone} href={`tel:${phone.replace(' ', '-')}`}>
            {phone}
          </a>
          <br />
          <a
            className={styles.emailDesktop}
            href={`mailto:${email}`}
            onClick={handleClickEmail}
            ref={emailRef}
          >
            {email}
          </a>
          <a className={styles.emailMobile} href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <div className={`${styles.address}`}>
          <span className={styles.name}>Random Paris</span>
          <div className={styles.location}>
            174 Quai de Jemmapes
            <br />
            75010 Paris
            <br />
            France
            <br />
            <a
              href="https://goo.gl/maps/8JhU7KsTLAaZZtGA9"
              rel="noreferrer"
              target="_blank"
            >
              Directions
            </a>
          </div>

          <a className={styles.phone} href="tel:+33-(0)-1-40-36-41-44">
            {'+33 (0) 1 40 36 41 44'}
          </a>
          <br />
          <a
            className={styles.emailDesktop}
            href="mailto:morgan.maccari@random.studio"
            onClick={handleClickEmail}
            ref={emailRef}
          >
            {'morgan.maccari@random.studio'}
          </a>
          <a
            className={styles.emailMobile}
            href="mailto:morgan.maccari@random.studio"
          >
            {'morgan.maccari@random.studio'}
          </a>
        </div>
      </div>
      <div className={styles.column}>
        <Newsletter />

        <div className={styles.socials}>
          <a
            className={styles.social}
            href="https://instagram.com/random_studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className={styles.social}
            href="https://www.linkedin.com/company/random-studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className={styles.social}
            href="https://medium.com/random-studio/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Medium
          </a>
        </div>
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
