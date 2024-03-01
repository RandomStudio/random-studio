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
    // If fetch is not supported, we will not show any job offers
    // IE11 and lower
    if (window.fetch) {
      fetch('https://career.recruitee.com/api/c/23038/widget/?widget=true')
        .then(async res => {
          try {
            const json = await res.json();
            return json;
          } catch (e) {
            return {};
          }
        })
        .then(json => {
          setRecruiteeData(json);

          if (location.hash && (json.offers && json.offers.length)) {
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

    // react-hooks/exhaustive-deps about location.hash
    // Should only check it once on render, so disabled eslint for it
    // eslint-disable-next-line
  }, []);

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
        <p className={styles.openRoles}>Open Roles</p>
        <ul className={styles.list}>
          {recruiteeData.offers.map(offer => (
            <li className={styles.item} key={offer.id}>
              <p className={styles.department}>{offer.department}</p>
              <a className={styles.role} href={`#${offer.id}`} onClick={() => handleOpenOffer(offer)}>
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
