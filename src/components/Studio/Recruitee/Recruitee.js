import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Recruitee.module.scss';
import JobOffer from './JobOffer/JobOffer';
import { jobOpeningPropType } from '../../../propTypes';

const Recruitee = ({ jobOpenings }) => {
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
    const {
      target: { id },
    } = event;

    setOpenRoleId(id ?? null);
    event.preventDefault();
  };

  if (!jobOpenings || !jobOpenings.length) {
    return null;
  }

  return (
    <>
      <aside className={styles.recruitee}>
        <p className={styles.title}>{'Open Positions'}</p>

        <ul className={styles.list}>
          {jobOpenings.map(opening => (
            <li className={styles.item} key={opening.url}>
              <a
                className={styles.role}
                href={`?role=${opening.id}`}
                id={opening.id}
                onClick={handleChangeRole}
              >
                {opening.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {openJob && <JobOffer handleClose={handleChangeRole} opening={openJob} />}
    </>
  );
};

Recruitee.propTypes = {
  jobOpenings: PropTypes.arrayOf(jobOpeningPropType).isRequired,
};

export default Recruitee;
