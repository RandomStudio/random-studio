import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styles from './JobOffer.module.scss';

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

      <div dangerouslySetInnerHTML={{ __html: jobDescription }} />
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
