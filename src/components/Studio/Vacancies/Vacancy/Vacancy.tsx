import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './Vacancy.module.css';
import Markdown from '../../../Markdown/Markdown';

type VacancyProps = {
  handleClose: () => void;
  opening: {
    title: string;
    description: string;
    url: string;
    id: string;
    _publishedAt: string;
  };
};

const Vacancy = ({
  handleClose,
  opening: { title, description, url },
}: VacancyProps) => {
  useEffect(() => {
    window.plausible?.('Vacancy viewed', {
      props: {
        role: title,
      },
    });
  }, [title]);

  return (
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

        <Markdown className={styles.description} markdown={description} />

        <Link className={styles.applyButton} href={url} target="_blank">
          {'Apply for this position'}
        </Link>
      </div>
    </section>
  );
};

export default Vacancy;
