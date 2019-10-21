import styles from "./recruitee.module.scss"
import React, { useEffect, useState } from "react"
import JobOffer from "./JobOffer/jobOffer"

const Recruitee = () => {
  const [recruiteeData, setRecruiteeData] = useState({})
  const [openOffer, setOpenOffer] = useState()

  useEffect(() => {
    fetch("https://career.recruitee.com/api/c/23038/widget/?widget=true")
      .then(res => res.json())
      .then(json => setRecruiteeData(json))
      .catch(err => {
        throw new Error(`Failed to fetch open job offers: ${err}`)
      })
  }, [])

  const handleOpenOffer = offer => {
    document.body.classList.add("prevent-scroll")
    setOpenOffer(offer)
  }

  const handleCloseOffer = () => {
    setOpenOffer(null)
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
              <span onClick={() => handleOpenOffer(offer)}>{offer.title}</span>
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
