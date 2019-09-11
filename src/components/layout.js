import React from "react"
import styles from "./layout.module.css"

const backgroundTransitionColors = ["#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]

export default ({ children }) => (
  <>
    <nav className={styles.nav}>
      <a href="/#projects">Projects</a>
    </nav>
    {children}
    <div
      className={styles.backgroundTransition}
      style={{
        backgroundColor:
          backgroundTransitionColors[
            Math.floor(Math.random() * backgroundTransitionColors.length)
          ],
      }}
    />
  </>
)
