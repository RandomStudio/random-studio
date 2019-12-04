import React from 'react';
import ReactMarkdown from 'react-markdown';
import Newsletter from './Newsletter/Newsletter';
import styles from './Footer.module.scss';

export default ({ address, contact }) => (
  <footer className={styles.footer}>
    <div className={styles.studio}>
      <div className={styles.column}>
        <ReactMarkdown escapeHtml={false} source={address} linkTarget="__blank" />
      </div>

      <div className={styles.column}>
        <ReactMarkdown escapeHtml={false} source={contact} />
      </div>
    </div>
    <Newsletter />
  </footer>
);
