import styles from "./impression.module.scss"
import React from "react"
import ImageCarousel from "../../General/ImageCarousel/imageCarousel"

const Impression = ({ data: { title, showIndicator, images } }) => {
  return (
    <div className={styles.impression}>
      <div className={styles.carouselWrapper}>
        <ImageCarousel
          images={images}
          showIndicator={showIndicator}
          title={title}
        />
      </div>
    </div>
  )
}

export default Impression
