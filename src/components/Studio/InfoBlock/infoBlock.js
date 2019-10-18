import styles from "./infoBlock.module.scss"
import React, { Fragment } from "react"
import ReactMarkdown from "react-markdown"
import ImageCarousel from "../../General/ImageCarousel/imageCarousel"

const InfoBlock = ({ collection }) => {
  return (
    <section className={styles.infoBlock}>
      {collection.map(({ showIndicator, info, images }, index) => {
        return (
          <Fragment key={index}>
            {images && images.length ? (
              <div className={styles.carouselWrapper}>
                <ImageCarousel
                  images={images}
                  info={info}
                  showIndicator={showIndicator}
                />
              </div>
            ) : (
              <ReactMarkdown
                className={styles.info}
                escapeHtml={false}
                source={info}
              />
            )}
          </Fragment>
        )
      })}
    </section>
  )
}

export default InfoBlock
