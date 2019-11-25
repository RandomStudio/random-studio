import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Footer.module.scss';

export default ({ address, contact }) => (
  <footer className={styles.footer}>
    <div>
      <ReactMarkdown escapeHtml={false} source={address} linkTarget="__blank" />
    </div>

    <div>
      <ReactMarkdown escapeHtml={false} source={contact} />
    </div>
  </footer>
);
