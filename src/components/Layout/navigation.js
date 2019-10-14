import React from "react"
import styles from "./navigation.module.css"

export default () => (
  <nav className={styles.nav}>
    <a href="/#projects">Projects</a>
    <a href="/studio">Studio</a>
    <a
      href="https://medium.com/@random.studio"
      target="_blank"
      rel="noopener noreferrer"
    >
      Research
    </a>
  </nav>
)
