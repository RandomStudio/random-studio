import styles from "./imageCarousel.module.scss"
import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import PropTypes from "prop-types"
import Img from "gatsby-image/withIEPolyfill"

const ImageCarousel = ({ images, showIndicator, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  if (!images) return null

  return (
    <div className={styles.carousel}>
      {images.map(({ image, caption }, index) => (
        <div
          className={`
            ${styles.image}
            ${index === currentIndex && styles.imageVisible}
          `}
          key={image.childImageSharp.fluid.src}
          style={
            index === currentIndex
              ? { display: "block", opacity: 1 }
              : { display: "none", opacity: 0 }
          }
        >
          <div
            className={`${images.length > 1 && styles.hasMultiple}`}
            onClick={handleNextImage}
          >
            {image.childImageSharp ? (
              <Img objectFit="contain" fluid={image.childImageSharp.fluid} />
            ) : (
              <img alt="" src={image} />
            )}
          </div>
          {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
        </div>
      ))}
      <div className={styles.indicatorWrapper}>
        {title && <p>{title}</p>}
        {showIndicator && images.length > 1 && (
          <span>
            {currentIndex + 1} of {images.length}
          </span>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
