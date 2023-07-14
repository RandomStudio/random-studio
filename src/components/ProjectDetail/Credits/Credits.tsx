import React from "react";

import { CreditsType } from "../../../types";

import styles from "./Credits.module.scss";

type CreditsProps = {
  credits: CreditsType[];
  externalUrl: string;
};

export const Credits = ({ credits, externalUrl }: CreditsProps) => {
  return (
    <dl aria-label="Project Details" className={styles.wrapper}>
      {credits.map((credit) => (
        <React.Fragment key={credit.label}>
          <dt>{`${credit.label}:`}</dt>

          <dd>
            {credit.link ? (
              <a href={credit.link} target="_blank" rel="noreferrer noopener">
                {credit.text}
              </a>
            ) : (
              credit.text
            )}
          </dd>
        </React.Fragment>
      ))}
      {externalUrl && <a className={styles.externalUrl} href={externalUrl} target="_blank" rel="noreferrer noopener">View website</a>}
    </dl>
  );
};

export default Credits;
