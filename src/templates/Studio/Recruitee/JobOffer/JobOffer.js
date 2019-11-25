import styles from "./jobOffer.module.scss"
import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const JobOffer = ({
  closeOpenOffer,
  offer: { title, description, requirements, careers_apply_url },
}) => {
  return (
    <section className={styles.jobOffer}>
      <div>
        <header>
          <strong>{title}</strong>
          <button className={styles.closeButton} onClick={closeOpenOffer}>
            &times;
          </button>
        </header>

        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <div dangerouslySetInnerHTML={{ __html: requirements }}></div>
        <OutboundLink
          target="blank"
          href={careers_apply_url}
          className={styles.applyButton}
        >
          Apply for this position
        </OutboundLink>
      </div>
    </section>
  )
}

export default JobOffer
