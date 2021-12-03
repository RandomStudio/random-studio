import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './JobOffer.module.scss';

// Todo: restore analytics

const JobOffer = ({
  closeOpenOffer,
  opening: { jobTitle, jobDescription, jobURL },
}) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{jobTitle}</strong>
        <button className={styles.closeButton} onClick={closeOpenOffer}>
          &times;
        </button>
      </header>

      <ReactMarkdown
        className={styles.description}
        escapeHtml={false}
        source={jobDescription}
      />
      <a className={styles.applyButton} href={jobURL} target="blank">
        {'Apply for this position'}
      </a>
    </div>
  </section>
);

export default JobOffer;
