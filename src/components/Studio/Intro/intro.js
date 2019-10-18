import styles from "./intro.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"
import Recruitee from "../Recruitee/recruitee"

const Intro = ({ data: { address, contact, intro } }) => (
  <>
    <h1 className={styles.logo}>
      Random
      <br />
      Studio
    </h1>
    <div className={styles.intro}>
      <header className={styles.introHeader}>
        <div className={styles.address}>
          <div>
            <ReactMarkdown escapeHtml={false} source={address} />
          </div>
          <div>
            <ReactMarkdown escapeHtml={false} source={contact} />
          </div>
        </div>

        <ReactMarkdown escapeHtml={false} source={intro} />
      </header>
      <Recruitee />
    </div>
  </>
)

export default Intro
