import styled from "./infoBlock.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"
import ImageCarousel from "../../General/ImageCarousel/imageCarousel"

const InfoBlock = ({ collection }) => {
  return (
    <section className={styled.infoBlock}>
      {collection.map(({ showIndicator, info, images }, index) => {
        return (
          <>
            {images && images.length ? (
              <div className={styled.imageStyle}>
                <ImageCarousel
                  images={images}
                  info={info}
                  key={index}
                  showIndicator={showIndicator}
                />
              </div>
            ) : (
              <ReactMarkdown
                className={styled.info}
                key={index}
                escapeHtml={false}
                source={info}
              />
            )}
          </>
        )
      })}
    </section>
  )
}

export default InfoBlock
