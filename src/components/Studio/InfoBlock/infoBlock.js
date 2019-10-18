import styles from "./infoBlock.module.scss"
import React from "react"
import ReactMarkdown from "react-markdown"
import ImageCarousel from "../../General/ImageCarousel/imageCarousel"

const InfoBlock = ({ collection }) => {
  return (
    <section className={styles.infoBlock}>
      {collection.map(({ showIndicator, info, images }, index) => {
        return (
          <>
            {images && images.length ? (
              <div className={styles.imageStyle}>
                <ImageCarousel
                  images={images}
                  info={info}
                  key={index}
                  showIndicator={showIndicator}
                />
              </div>
            ) : (
              <ReactMarkdown
                className={styles.info}
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
