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

  const handleClickEmail = event => copyStringToClipboard(event, email, setIsToastVisible);

  return (
    <footer className={styles.footer}>
      <div className={styles.studio}>
        <div className={`${styles.address} ${styles.column}`}>
          <ReactMarkdown
            escapeHtml={false}
            source={address}
            linkTarget="__blank"
          />
        </div>

        <div className={styles.column}>
          <a className={styles.phone} href={`tel:${phone.replace(' ', '-')}`}>
            {phone}
          </a>
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
      </div>
      <Newsletter />
    </footer>
  );
};

Footer.propTypes = {
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Footer;
