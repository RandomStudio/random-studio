import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './ImageCarousel.module.scss';
import FluidImage from '../FluidImage/FluidImage';

const ImageCarousel = ({
  images,
  carousel,
  showIndicator,
  title,
  objectFit,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();
  const handleNextImage = () => {
    if (videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime = 0;
    }
    setCurrentIndex((currentIndex + 1) % (images || carousel).length);
  };

  if (!images && !carousel) return null;

  return (
    <div className={`${styles.carousel} ${className}`}>
      {(images || carousel).map(({ url, image, caption }, index) => (
        <div
          className={`
        ${styles.image}
        ${index === currentIndex && styles.imageVisible}
        `}
          key={
            image && image.childImageSharp
              ? image.childImageSharp.fluid.src
              : index
          }
          style={
            index === currentIndex
              ? { display: 'block', opacity: 1 }
              : { display: 'none', opacity: 0 }
          }
        >
          <div
            className={`${
              (images || carousel).length > 1 && styles.hasMultiple
            }`}
            onClick={handleNextImage}
          >
            {url ? (
              <video ref={videoRef} src={url} muted loop autoPlay playsInline />
            ) : (
              <FluidImage image={image} objectFit={objectFit} loading="auto" />
            )}
            {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
          </div>
        </div>
      ))}
      <div className={styles.indicatorWrapper}>
        {title && <p>{title}</p>}
        {showIndicator && (images || carousel).length > 1 && (
          <span>{`${currentIndex + 1} of ${(images || carousel).length}`}</span>
        )}
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  className: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  showIndicator: PropTypes.bool,
  title: PropTypes.string,
};

ImageCarousel.defaultProps = {
  className: '',
  objectFit: 'cover',
  showIndicator: false,
  title: '',
};

export default ImageCarousel;
