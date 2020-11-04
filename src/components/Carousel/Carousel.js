import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './Carousel.module.scss';
import FluidImage from '../FluidImage/FluidImage';

const Carousel = ({ carousel, showIndicator, title, objectFit, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);

  const carouselElementsRef = useRef(
    [...Array(carousel.length)].map(() => React.createRef()),
  );

  const videoRef = useRef();

  const handleNext = () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime = 0;
    }

    setCurrentIndex((currentIndex + 1) % carousel.length);
  };

  useEffect(() => {
    const {
      height,
    } = carouselElementsRef.current[0].current.getBoundingClientRect();

    console.log(height);

    setCarouselHeight(height);
  }, []);

  if (!carousel) return null;

  return (
    <div className={`${styles.carousel} ${className}`}>
      {carousel.map(({ url, image, caption }, index) => (
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
            <div
              ref={carouselElementsRef.current[index]}
              // style={{ height: `${carouselHeight}px` }}
            >
              {url ? (
                <video src={url} muted loop autoPlay playsInline />
              ) : (
                <FluidImage
                  image={image}
                  objectFit={objectFit}
                  loading="auto"
                />
              )}
            </div>
            {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
          </div>
        </div>
      ))}
      <div className={styles.indicatorWrapper}>
        {title && <p>{title}</p>}
        {showIndicator && carousel.length > 1 && (
          <span>{`${currentIndex + 1} of ${carousel.length}`}</span>
        )}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
  carousel: PropTypes.arrayOf(PropTypes.object).isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  showIndicator: PropTypes.bool,
  title: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
  objectFit: 'cover',
  showIndicator: false,
  title: '',
};

export default Carousel;
