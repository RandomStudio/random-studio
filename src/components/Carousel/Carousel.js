import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './Carousel.module.scss';
import FluidImage from '../FluidImage/FluidImage';
import Caption from '../ProjectDetail/Caption/Caption';

const Carousel = ({
  carousel, caption, title, objectFit, className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();

  const handleNext = () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime = 0;
    }

    setCurrentIndex((currentIndex + 1) % carousel.length);
  };

  if (!carousel) return null;

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
                <video src={url} muted loop autoPlay playsInline />
              ) : (
                image && (
                <FluidImage image={image} objectFit={objectFit} loading="auto" />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <Caption caption={caption} carouselIndicator={`${currentIndex + 1} of ${carousel.length}`} />
    </div>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
  carousel: PropTypes.arrayOf(PropTypes.object).isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  title: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
  objectFit: 'cover',
  title: '',
};

export default Carousel;
