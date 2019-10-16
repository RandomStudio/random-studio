import styles from "./intro.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"

const Intro = ({ data: { address, contact, intro } }) => (
  <>
    <h1 className={styles.logo}>
      Random
      <br />
      Studio
    </h1>
    <div className={styles.intro}>
      <div className={styles.address}>
        <div>
          <ReactMarkdown escapeHtml={false} source={address} />
        </div>
        <div>
          <ReactMarkdown escapeHtml={false} source={contact} />
        </div>
      </div>

      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
  </>
)

export default Intro
