import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './InfoBlock.module.scss';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';

const InfoBlock = ({ collection }) => (
  <section className={styles.infoBlock}>
    {collection.map(({ showIndicator, info, images }, index) => (
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
    ))}
  </section>
);

export default InfoBlock;
