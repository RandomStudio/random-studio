import styles from "./recruitee.module.scss"
import React, { useEffect, useState } from "react"

const Recruitee = () => {
  const [recruiteeData, setRecruiteeData] = useState({})

  useEffect(() => {
    fetch("https://career.recruitee.com/api/c/23038/widget/?widget=true")
      .then(res => res.json())
      .then(json => setRecruiteeData(json))
      .catch(err => {
        throw new Error(`Failed to feetch open job offers: ${err}`)
      })
  }, [])

  if (!recruiteeData.offers || !recruiteeData.offers.length) return null

  return (
    <aside className={styles.recruitee}>
      <p>Open Roles</p>
      <ul>
        {recruiteeData.offers.map(offer => (
          <li key={offer.id}>
            <span>{offer.title}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Recruitee
