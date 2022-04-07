import React from 'react';
import ReactMarkdown from 'react-markdown';
import { OutboundLink } from 'react-ga';
import PropTypes from 'prop-types';
import styles from './JobOffer.module.scss';
import { jobOpeningPropType } from '../../../../propTypes';

const JobOffer = ({ handleClose, opening: { title, description, url } }) => (
  <section className={styles.jobOffer}>
    <div>
      <header>
        <strong>{title}</strong>

        <button
          className={styles.closeButton}
          onClick={handleClose}
          type="button"
          // eslint-disable-next-line react/jsx-no-literals
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

JobOffer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  opening: jobOpeningPropType.isRequired,
};

export default JobOffer;
