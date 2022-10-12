import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-datocms';
import styles from './Carousel.module.css';
import Caption from '../Caption/Caption';
import { slidePropType } from '../../propTypes';
import LazyVideo from '../LazyVideo/LazyVideo';

const Carousel = ({ caption, className, slides, sizes, width }) => {
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
      <div className={styles.slides}>
        {slides.map(({ id, video, imageData, image }, index) => (
          <div
            className={styles.image}
            data-visible={index === currentIndex}
            key={id}
          >
            <div
              className={slides.length > 1 && styles.hasMultiple}
              onClick={handleNext}
            >
              {video && <LazyVideo isMuted video={video} width={width} />}

              {(image || imageData) && (
                <Image
                  alt={`${caption} – slide ${index + 1}`}
                  data={imageData ?? image.imageData}
                  sizes={sizes}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.caption}>
        <p>{caption}</p>

        <p>{`${currentIndex + 1} of ${slides.length}`}</p>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  sizes: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(slidePropType).isRequired,
};

Carousel.defaultProps = {
  caption: '',
  className: '',
};

export default Carousel;
