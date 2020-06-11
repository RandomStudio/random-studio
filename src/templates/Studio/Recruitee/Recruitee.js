import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import styles from './Recruitee.module.scss';
import JobOffer from './JobOffer/JobOffer';

const Recruitee = ({ location }) => {
  const [recruiteeData, setRecruiteeData] = useState({});
  const [openOffer, setOpenOffer] = useState();

  const handleOpenOffer = offer => {
    document.body.classList.add('prevent-scroll');
    setOpenOffer(offer);
  };

  useEffect(() => {
    if (!location.hash && openOffer) {
      handleCloseOffer();
    }

    // If fetch is not supported, we will not show any job offers
    // IE11 and lower
    if (
      window.fetch
      && (!recruiteeData.offers || !recruiteeData.offers.length)
    ) {
      fetch('https://career.recruitee.com/api/c/23038/widget/?widget=true')
        .then(res => res.json())
        .then(json => {
          setRecruiteeData(json);

          if (location.hash && json.offers && json.offers.length) {
            const selectedOffer = json.offers.find(
              offer => offer.id
                === parseInt(location.hash.substring(1, location.hash.length), 10),
            );

            if (selectedOffer) {
              handleOpenOffer(selectedOffer);
            }
          }
        })
        .catch(err => {
          throw new Error(`Failed to fetch open job offers: ${err}`);
        });
    }
  }, [location.hash, recruiteeData.length, recruiteeData.offers]);

  const handleCloseOffer = () => {
    setOpenOffer(null);
    // Replace as offer is programmatically opened
    navigate('/studio', { replace: true });
    document.body.classList.remove('prevent-scroll');
  };

  if (!recruiteeData.offers || !recruiteeData.offers.length) return null;

  return (
    <>
      <aside className={styles.recruitee}>
        <p className={styles.title}>{'Open Positions'}</p>
        <ul className={styles.list}>
          {recruiteeData.offers.map(offer => (
            <li className={styles.item} key={offer.id}>
              <a
                className={styles.role}
                href={`#${offer.id}`}
                onClick={() => handleOpenOffer(offer)}
              >
                {offer.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {openOffer && (
        <JobOffer closeOpenOffer={handleCloseOffer} offer={openOffer} />
      )}
    </>
  );
};

export default Recruitee;
