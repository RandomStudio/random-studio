import styles from "./jobOffer.module.scss"
import React, { useState, useRef } from "react"

const JobOffer = ({
  closeOpenOffer,
  offer: { title, description, requirements },
}) => {
  const handleFormSwitch = () => {
    setIsSubmitForm(prevState => !prevState)
  }

  return (
    <section className={styles.jobOffer}>
      <div>
        <header>
          <button className={styles.closeButton} onClick={closeOpenOffer}>
            &times;
          </button>
          <strong>{title}</strong>
        </header>

        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <div dangerouslySetInnerHTML={{ __html: requirements }}></div>
        <button className={styles.applyButton} onClick={handleFormSwitch}>
          Apply for this position
        </button>
      </div>
    </section>
  )
}

export default JobOffer
