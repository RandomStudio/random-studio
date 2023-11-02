import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './Vacancies.module.css';
import Vacancy from './Vacancy/Vacancy';
import { Vacancy as VacancyType } from '../../../types/types';

type VacanciesProps = {
  className?: string;
  vacancies: VacancyType[];
};

const Vacancies = ({ className = undefined, vacancies }: VacanciesProps) => {
  const [openRoleId, setOpenRoleId] = useState<string | undefined>(undefined);
  const openJob = vacancies.find(({ id }) => openRoleId === id);

  useEffect(() => {
    const url = new URL(window.location.href);
    const roleId = url.searchParams.get('role');

    if (roleId) {
      setOpenRoleId(roleId);
    }
  }, []);

  useEffect(() => {
    if (!openRoleId) {
      window.history.pushState(null, '', window.location.pathname);

      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('role', openRoleId.toString());

    window.history.pushState(
      null,
      '',
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  }, [openRoleId]);

  const handleChangeRole = (event: MouseEvent<HTMLElement>) => {
    setOpenRoleId(event?.currentTarget?.id);
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

export default Vacancies;
