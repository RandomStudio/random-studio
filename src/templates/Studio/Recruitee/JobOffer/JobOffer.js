import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styles from './JobOffer.module.scss';

const JobOffer = ({
  closeOpenOffer,
  offer: {
    title, description, requirements, careers_apply_url,
  },
}) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{title}</strong>
        <button className={styles.closeButton} onClick={closeOpenOffer}>
          &times;
        </button>
      </header>

      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div dangerouslySetInnerHTML={{ __html: requirements }} />
      <OutboundLink
        target="blank"
        href={careers_apply_url}
        className={styles.applyButton}
      >
        {'Apply for this position'}
      </OutboundLink>
    </div>
  </section>
);

export default JobOffer;
