import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { CreditsType } from "../../../types";

import styles from "./Credits.module.scss";

type CreditsProps = {
  details: { [key: string]: string };
  credits: CreditsType[];
};

export const Credits = ({ credits, details }: CreditsProps) => {
  // Until we refactor the content on the CMS
  if (!credits.length) {
    return (
      <dl aria-label="Project Details" className={styles.wrapper}>
        {Object.entries(details ?? {})?.map(([key, value]) => (
          <React.Fragment key={`${key}-${value}`}>
            <dt>{`${key}:`}</dt>

            <dd>
              <ReactMarkdown linkTarget="_blank">
                {value.replaceAll("<br />", "<br>").replaceAll("<br>", "\n\n")}
              </ReactMarkdown>
            </dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }

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
