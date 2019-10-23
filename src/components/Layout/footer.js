import React from "react"
import styles from "./footer.module.css"
import ReactMarkdown from "react-markdown"

export default ({ address, contact }) => (
  <footer className={styles.footer}>
    <div>
      <ReactMarkdown escapeHtml={false} source={address} linkTarget="__blank" />
    </div>

    <div>
      <ReactMarkdown escapeHtml={false} source={contact} />
    </div>
  </footer>
)
