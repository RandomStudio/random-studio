import styled from "./imageCarousel.module.scss"
import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
// import Img from "gatsby-image"
import Img from "gatsby-image/withIEPolyfill"

const ImageCarousel = ({ images, showIndicator, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  if (!images) return null

  return (
    <div className={styled.carousel}>
      {images.map(({ image, caption }, index) => (
        <div
          className={`${styled.image} ${index === currentIndex &&
            styled.imageVisible}`}
          key={image.childImageSharp.fluid.src}
          style={
            index === currentIndex
              ? { display: "block", opacity: 1 }
              : { display: "none", opacity: 0 }
          }
        >
          {image.childImageSharp ? (
            <Img
              objectFit="contain"
              onClick={handleNextImage}
              fluid={image.childImageSharp.fluid}
            />
          ) : (
            <img onClick={handleNextImage} alt="" src={image} />
          )}
          {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
        </div>
      ))}
      <div>
        {title && <p>{title}</p>}
        {showIndicator && (
          <span>
            {currentIndex + 1} of {images.length}
          </span>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
