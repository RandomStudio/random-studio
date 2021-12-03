import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.module.scss';
import Caption from '../Projects/ProjectDetail/Caption/Caption';
import FluidImage from '../FluidImage/FluidImage';

const Carousel = ({ carousel, caption, objectFit, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();

  const handleNext = () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime = 0;
    }

    setCurrentIndex((currentIndex + 1) % carousel.length);
  };

  if (!carousel) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.carouselInner}>
        {carousel.map(({ url, image }, index) => (
          <div
            className={`
            ${styles.image}
            ${index === currentIndex && styles.imageVisible}
          `}
            key={index}
          >
            <div
              className={`${carousel.length > 1 && styles.hasMultiple}`}
              onClick={handleNext}
            >
              {url ? (
                <video autoPlay loop muted playsInline src={url} />
              ) : (
                image && (
                  <FluidImage
                    image={image}
                    loading="auto"
                    objectFit={objectFit}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <Caption
        caption={caption}
        carouselIndicator={`${currentIndex + 1} of ${carousel.length}`}
      />
    </div>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
  carousel: PropTypes.arrayOf(PropTypes.object).isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
};

Carousel.defaultProps = {
  className: '',
  objectFit: 'cover',
};

export default Carousel;
