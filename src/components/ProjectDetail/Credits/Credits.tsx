import React from 'react';

import { CreditsType } from '../../../types/types';

import styles from './Credits.module.scss';

type CreditsProps = {
  credits: CreditsType[];
  externalUrl: string;
};

export const Credits = ({ credits, externalUrl }: CreditsProps) => {
  return (
    <dl aria-label="Project Details" className={styles.wrapper}>
      {credits.map(credit => (
        <React.Fragment key={credit.label}>
          <dt>{`${credit.label}:`}</dt>

          <dd>
            {credit.link ? (
              <a href={credit.link} rel="noreferrer noopener" target="_blank">
                {credit.text}
              </a>
            ) : (
              credit.text
            )}
          </dd>
        </React.Fragment>
      ))}

      {externalUrl && (
        <a
          className={styles.externalUrl}
          href={externalUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          View website
        </a>
      )}
    </dl>
  );
};

export default Credits;
