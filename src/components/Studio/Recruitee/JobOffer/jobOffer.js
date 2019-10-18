import styles from "./jobOffer.module.scss"
import React from "react"

const JobOffer = ({
  closeOpenOffer,
  offer: { title, description, requirements },
}) => {
  return (
    <>
      <section className={styles.jobOffer}>
        <button className={styles.closeButton}>&times;</button>
        <p>job offer - {title}</p>

        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <div dangerouslySetInnerHTML={{ __html: requirements }}></div>
        <button className={styles.applyButton}></button>
      </section>

      <section className={styles.applyForm}></section>
    </>
  )
}

export default JobOffer
