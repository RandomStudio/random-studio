import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Newsletter from './Newsletter/Newsletter';
import styles from './Footer.module.scss';

export default ({ address, email, phone }) => {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const emailRef = useRef();

  const handleClickEmail = e => {
    try {
      window.getSelection().selectAllChildren(emailRef.current);
      document.execCommand('copy');
      setIsNoticeVisible(true);
      window.setTimeout(() => setIsNoticeVisible(false), 3000);

      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }

      e.preventDefault();
    } catch (error) {
      console.log('Failed to copy. Will open mailto link as normal. Error:', error);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.studio}>
        <div className={`${styles.address} ${styles.column}`}>
          <ReactMarkdown escapeHtml={false} source={address} linkTarget="__blank" />
        </div>

        <div className={styles.column}>
          <a className={styles.phone} href={`tel:${phone.replace(' ', '-')}`}>{phone}</a>
          <a className={styles.emailDesktop} href={`mailto:${email}`} onClick={handleClickEmail} ref={emailRef}>{email}</a>
          <a className={styles.emailMobile} href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
      <Newsletter />
      <div className={`${styles.notice} ${isNoticeVisible && styles.noticeIsVisible}`}>Copied to clipboard</div>
    </footer>
  );
};
