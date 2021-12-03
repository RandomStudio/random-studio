import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Recruitee.module.scss';
import JobOffer from './JobOffer/JobOffer';

const Recruitee = ({ jobOpenings }) => {
  const router = useRouter();
  const [openOpening, setOpenOpening] = useState();

  const handleOpenOpening = offer => {
    document.body.classList.add('prevent-scroll');
    setOpenOpening(offer);
  };

  const handleCloseOpening = () => {
    setOpenOpening(null);
    // Replace as offer is programmatically opened
    router.replace('/studio');
    document.body.classList.remove('prevent-scroll');
  };

  if (
    !jobOpenings ||
    !jobOpenings.length ||
    !jobOpenings.some(opening => opening.jobIsVisible)
  ) {
    return null;
  }

  return (
    <>
      <aside className={styles.recruitee}>
        <p className={styles.title}>{'Open Positions'}</p>
        <ul className={styles.list}>
          {jobOpenings.map(
            opening =>
              opening.jobIsVisible && (
                <li className={styles.item} key={opening.jobURL}>
                  <a
                    className={styles.role}
                    href={`#${opening.jobURL}`}
                    onClick={() => handleOpenOpening(opening)}
                  >
                    {opening.jobTitle}
                  </a>
                </li>
              ),
          )}
        </ul>
      </aside>

      {openOpening && (
        <JobOffer closeOpenOffer={handleCloseOpening} opening={openOpening} />
      )}
    </>
  );
};

export default Recruitee;
