import styled from "./infoBlock.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"
import ImageCarousel from "../../General/ImageCarousel/imageCarousel"

const InfoBlock = ({ collection }) => {
  console.log(collection)

  return (
    <section>
      {collection.map(({ showIndicator, info, images }, index) => (
        <>
          {images && images.length ? (
            <ImageCarousel
              info={info}
              key={index}
              images={images}
              showIndicator={showIndicator}
            />
          ) : (
            <ReactMarkdown key={index} escapeHtml={false} source={info} />
          )}
        </>
      ))}
    </section>
  )
}

export default InfoBlock
