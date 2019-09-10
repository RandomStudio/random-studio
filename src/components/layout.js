import React from "react"
import styles from "./layout.module.css"

const backgroundTransitionColors = ["#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]

export default ({ children }) => (
  <>
    <nav className={styles.nav}>
      <a href="/">Projects</a>
      <a href="/studio">Studio</a>
      <a href="/ff">FF</a>
    </nav>
    {children}
    <div
      className={styles.reveal}
      style={{
        backgroundColor:
          backgroundTransitionColors[
            Math.floor(Math.random() * backgroundTransitionColors.length)
          ],
      }}
    />
  </>
)
