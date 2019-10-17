import styled from "./imageCarousel.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"

const ImageCarousel = ({ images, showIndicator, info }) => {
  console.log(images ? "wel" : "niks", images, info)
  if (!images) return null

  return (
    <div>
      {images.map(({ image, caption }, index) => (
        <div key={index}>
          <img src={image}></img>
          {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
        </div>
      ))}
      {showIndicator && <span>1 of {images.length}</span>}
    </div>
  )
}

export default ImageCarousel
