import React from "react"
import styles from "./homeVideo.module.css"

export default () => (
  <div className={styles.video}>
    <video
      src="https://player.vimeo.com/external/219822090.hd.mp4?s=9fcbf6bfec731604e4b4d29e278e676848c2ac20&profile_id=119"
      muted
      loop
      autoPlay
      playsInline
    />
    <h1 className={styles.logo}>
      Random
      <br />
      Studio
    </h1>
    <a href="/#projects" className={styles.videoOverlay}>
      Projects
    </a>
    <div className={styles.featuredAuthor}>
      <span className={styles.logo}>Random Studio</span>
      <span> × </span>
      <span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/prendswash/"
        >
          Kevin
        </a>
      </span>
    </div>
  </div>
)
