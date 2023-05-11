import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './Vacancy.module.css';
import { vacancyPropType } from '../../../../propTypes';

const Vacancy = ({ handleClose, opening: { title, description, url } }) => (
  <section className={styles.vacancy}>
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>{title}</p>

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

      <a
        className={styles.applyButton}
        eventLabel={`Apply for ${title}`}
        target="_blank"
        to={url}
      >
        {'Apply for this position'}
      </a>
    </div>
  </section>
);

Vacancy.propTypes = {
  handleClose: PropTypes.func.isRequired,
  opening: vacancyPropType.isRequired,
};

export default Vacancy;
