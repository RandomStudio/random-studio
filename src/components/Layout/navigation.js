import React from "react"
import { Link } from "gatsby"
import styles from "./navigation.module.scss"

export default () => (
  <nav className={styles.nav}>
    <Link to="/#projects">Projects</Link>
    <Link to="/studio">Studio</Link>
  </nav>
)
