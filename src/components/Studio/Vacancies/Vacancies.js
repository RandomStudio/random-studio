import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Vacancies.module.css';
import JobOffer from './JobOffer/JobOffer';
import { jobOpeningPropType } from '../../../propTypes';

const Vacancies = ({ className, jobOpenings }) => {
  const [openRoleId, setOpenRoleId] = useState(null);
  const openJob = jobOpenings.find(({ id }) => openRoleId === id);

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

        {jobOpenings.map(opening => (
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

      {openJob && <JobOffer handleClose={handleChangeRole} opening={openJob} />}
    </>
  );
};

Vacancies.propTypes = {
  jobOpenings: PropTypes.arrayOf(jobOpeningPropType).isRequired,
};

export default Vacancies;
