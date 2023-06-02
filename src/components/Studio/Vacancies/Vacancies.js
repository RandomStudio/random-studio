import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Vacancies.module.css';
import Vacancy from './Vacancy/Vacancy.tsx';
import { vacancyPropType } from '../../../propTypes';

const Vacancies = ({ className, vacancies }) => {
  const [openRoleId, setOpenRoleId] = useState(null);
  const openJob = vacancies.find(({ id }) => openRoleId === id);

  useEffect(() => {
    const url = new URL(window.location.href);
    const role = url.searchParams.get('role');

    if (role) {
      setOpenRoleId(role);
    }
  }, []);

  useEffect(() => {
    if (!openRoleId) {
      window.history.pushState(null, '', window.location.pathname);

      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('role', openRoleId);

    window.history.pushState(
      null,
      '',
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  }, [openRoleId]);

  const handleChangeRole = event => {
    setOpenRoleId(event?.target?.id ?? null);
    event.preventDefault();
  };

  return (
    <>
      <aside className={`${styles.vacancies} ${className}`}>
        <p className={styles.heading}>{'Open Positions'}</p>

        {vacancies.map(opening => (
          <a
            className={styles.role}
            href={`?role=${opening.id}`}
            id={opening.id}
            key={opening.id}
            onClick={handleChangeRole}
          >
            {opening.title}
          </a>
        ))}
      </aside>

      {openJob && <Vacancy handleClose={handleChangeRole} opening={openJob} />}
    </>
  );
};

Vacancies.propTypes = {
  className: PropTypes.string,
  vacancies: PropTypes.arrayOf(vacancyPropType).isRequired,
};

Vacancies.defaultProps = {
  className: '',
};

export default Vacancies;
