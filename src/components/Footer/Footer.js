import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Footer.module.scss';

export default ({ address, contact }) => {
  const desktopBreakpoint = 1152;

  const email = 'hello@random.studio';
  const phone = '+31 20 779 7735';
  return (
    <footer className={styles.footer}>
      <div>
        <ReactMarkdown escapeHtml={false} source={address} linkTarget="__blank" />
      </div>

      <div>
        <a href={`tel:${phone.replace(' ', '-')}`}>{phone}</a>
        <ReactMarkdown escapeHtml={false} source={email} />
      </div>
    </footer>
  );
};
