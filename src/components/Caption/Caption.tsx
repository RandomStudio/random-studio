import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Caption.module.scss';

type CaptionProps = {
  marginLeft: number,
  caption: string,
}

const Caption = ({ marginLeft, caption }: CaptionProps) => (
    <div
      className={styles.caption}
      style={{ marginLeft: marginLeft ? '' : '1.4rem' }}
    >
      <ReactMarkdown>{caption}</ReactMarkdown>

    </div>
);

export default Caption;
