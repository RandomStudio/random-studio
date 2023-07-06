import React from "react";

import { CreditsType } from "../../../types";

import styles from "./Credits.module.scss";

type CreditsProps = {
  credits: CreditsType[];
};

export const Credits = ({ credits }: CreditsProps) => {
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
    </dl>
  );
};

export default Credits;
