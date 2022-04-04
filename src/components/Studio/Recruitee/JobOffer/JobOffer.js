import React from 'react';
import ReactMarkdown from 'react-markdown';
import { OutboundLink } from 'react-ga';
import styles from './JobOffer.module.scss';

const JobOffer = ({ closeOpenOffer, opening: { title, description, url } }) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{title}</strong>
        <button
          className={styles.closeButton}
          onClick={closeOpenOffer}
          type="button"
        >
          &times;
        </button>
      </header>
      <ReactMarkdown className={styles.description}>
        {description}
      </ReactMarkdown>
      <OutboundLink
        className={styles.applyButton}
        eventLabel={`Apply for ${title}`}
        target="_blank"
        to={url}
      >
        {'Apply for this position'}
      </OutboundLink>
    </div>
  </section>
);

export default JobOffer;
