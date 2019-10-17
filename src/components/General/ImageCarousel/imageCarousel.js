import styled from "./imageCarousel.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"
import Img from "gatsby-image"

const ImageCarousel = ({ images, showIndicator }) => {
  if (!images) return null

  return (
    <div className={styled.carousel}>
      {images.map(({ image, caption }, index) => (
        <div key={index}>
          {image.childImageSharp ? (
            <Img fluid={image.childImageSharp.fluid} />
          ) : (
            <img alt="" src={image} />
          )}
          {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
        </div>
      ))}
      {showIndicator && <span>1 of {images.length}</span>}
    </div>
  )
}

export default ImageCarousel
