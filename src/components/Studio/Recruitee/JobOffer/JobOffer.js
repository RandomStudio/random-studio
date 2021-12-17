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
          // eslint-disable-next-line react/jsx-no-literals
        >
          &times;
        </button>
      </header>

      <ReactMarkdown
        className={styles.description}
        escapeHtml={false}
        source={jobDescription}
      />
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
