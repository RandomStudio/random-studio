import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styles from './JobOffer.module.scss';
import ReactMarkdown from 'react-markdown';

const JobOffer = ({
  closeOpenOffer,
  opening: {
    jobTitle, jobDescription, jobURL,
  },
}) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{jobTitle}</strong>
        <button className={styles.closeButton} onClick={closeOpenOffer}>
          &times;
        </button>
      </header>

      <ReactMarkdown className={styles.description} escapeHtml={false} source={jobDescription} />
      <OutboundLink
        target="blank"
        href={jobURL}
        className={styles.applyButton}
      >
        {'Apply for this position'}
      </OutboundLink>
    </div>
  </section>
);

export default JobOffer;
