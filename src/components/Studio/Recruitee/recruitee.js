import styles from "./recruitee.module.scss"
import React, { useEffect, useState } from "react"
import JobOffer from "./JobOffer/jobOffer"
import { navigate } from "gatsby"

const Recruitee = ({ location }) => {
  const [recruiteeData, setRecruiteeData] = useState({})
  const [openOffer, setOpenOffer] = useState()

  useEffect(() => {
    // If fetch is not supported, we will not show any job offers
    // IE11 and lower
    if (window.fetch) {
      fetch("https://career.recruitee.com/api/c/23038/widget/?widget=true")
        .then(res => res.json())
        .then(json => {
          setRecruiteeData(json)

          if (location.hash && (json.offers && json.offers.length)) {
            const openOffer = json.offers.find(
              offer =>
                offer.id ===
                parseInt(location.hash.substring(1, location.hash.length), 10)
            )

            if (openOffer) {
              handleOpenOffer(openOffer)
            }
          }
        })
        .catch(err => {
          throw new Error(`Failed to fetch open job offers: ${err}`)
        })
    }

    // react-hooks/exhaustive-deps about location.hash
    // Should only check it once on render, so disabled eslint for it
    // eslint-disable-next-line
  }, [])

  const handleOpenOffer = offer => {
    document.body.classList.add("prevent-scroll")
    setOpenOffer(offer)
  }

  const handleCloseOffer = () => {
    setOpenOffer(null)
    // Replace as offer is programmatically opened
    navigate("/studio", { replace: true })
    document.body.classList.remove("prevent-scroll")
  }

  if (!recruiteeData.offers || !recruiteeData.offers.length) return null

  return (
    <>
      <aside className={styles.recruitee}>
        <p>Open Roles</p>
        <ul>
          {recruiteeData.offers.map(offer => (
            <li key={offer.id}>
              <a href={`#${offer.id}`} onClick={() => handleOpenOffer(offer)}>
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
  )
}

export default Recruitee
