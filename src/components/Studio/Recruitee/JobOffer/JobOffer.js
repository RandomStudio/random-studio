import React from 'react';
import ReactMarkdown from 'react-markdown';
import { OutboundLink } from 'react-ga';
import styles from './JobOffer.module.scss';

const JobOffer = ({
  closeOpenOffer,
  opening: { jobTitle, jobDescription, jobURL },
}) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{jobTitle}</strong>
        <button
          className={styles.closeButton}
          onClick={closeOpenOffer}
          type="button"
        >
          &times;
        </button>
      </header>

      <ReactMarkdown className={styles.description}>{jobDescription}</ReactMarkdown>
      <OutboundLink
        className={styles.applyButton}
        eventLabel={`Apply for ${jobTitle}`}
        target="_blank"
        to={jobURL}
      >
        {'Apply for this position'}
      </OutboundLink>
    </div>
  </section>
);

export default JobOffer;
