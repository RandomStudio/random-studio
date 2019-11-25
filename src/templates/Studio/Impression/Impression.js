import React from 'react';
import styles from './Impression.module.scss';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';

const Impression = ({ data: { title, showIndicator, images } }) => (
  <div className={styles.impression}>
    <div className={styles.carouselWrapper}>
      <ImageCarousel
        images={images}
        showIndicator={showIndicator}
        title={title}
      />
    </div>
  </div>
);

export default Impression;
