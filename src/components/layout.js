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
    <footer className={styles.footer}>
      <div>
        Westzaanstraat 10
        <br />
        1013 NG Amsterdam
        <br />
        The Netherlands
        <br />
        <a
          href="https://goo.gl/maps/7rGuGBBfhms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Directions
        </a>
      </div>

      <div>
        <a href="tel://+31 20 779 7735">+31 20 779 7735</a>
        <br />
        <a href="mailto:hello@random.studio">hello@random.studio</a>
        <br />
      </div>
    </footer>
  </>
)
