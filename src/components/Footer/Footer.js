import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Newsletter from './Newsletter/Newsletter';
import styles from './Footer.module.scss';
import { copyStringToClipboard } from '../../utils/copyClipboard';

const Footer = ({ address, email, phone }) => {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const emailRef = useRef();

  const handleClickEmail = event => copyStringToClipboard(event, email, setIsNoticeVisible);

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
      <div
        className={`${styles.notice} ${isNoticeVisible &&
          styles.noticeIsVisible}`}
      >
        Copied to clipboard
      </div>
    </footer>
  );
};

export default Footer;
