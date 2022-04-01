import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-datocms';
import styles from './Carousel.module.scss';
import Caption from '../Caption/Caption';

const Carousel = ({ slides, caption, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();

  const handleNext = () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime = 0;
    }

    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  if (!slides) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.carouselInner}>
        {slides.map(({ id, video, image }, index) => (
          <div
            className={`
            ${styles.image}
            ${index === currentIndex && styles.imageVisible}
          `}
            key={id}
          >
            <div
              className={`${slides.length > 1 && styles.hasMultiple}`}
              onClick={handleNext}
            >
              {video ? (
                <video autoPlay loop muted playsInline src={video} />
              ) : (
                image && (
                  <Image
                    alt={`${caption} – slide ${index + 1}`}
                    data={image.imageData}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <Caption
        caption={caption}
        carouselIndicator={`${currentIndex + 1} of ${slides.length}`}
      />
    </div>
  );
};

Carousel.propTypes = {
  carousel: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
};

export default Carousel;
