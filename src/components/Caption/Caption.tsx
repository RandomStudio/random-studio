import React from 'react';
import styles from './Caption.module.scss';
import Markdown from '../Markdown/Markdown';

type CaptionProps = {
  marginLeft: number;
  caption: string;
};

const Caption = ({ marginLeft, caption }: CaptionProps) => (
  <div
    className={styles.caption}
    style={{ marginLeft: marginLeft ? '' : '1.4rem' }}
  >
    <Markdown markdown={caption} />
  </div>
);

export default Caption;
