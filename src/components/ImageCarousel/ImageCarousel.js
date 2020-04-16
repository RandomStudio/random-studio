import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './ImageCarousel.module.scss';
import FluidImage from '../FluidImage/FluidImage';

const ImageCarousel = ({
  media,
  images,
  showIndicator,
  title,
  objectFit,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('media:', media);

  const handleNextImage = (imgs) => {
    setCurrentIndex((currentIndex + 1) % imgs.length);
  };

  if (media) {
    return (
      <div className={`${styles.carousel} ${className}`}>
        {media.map(
          (
            { marginTop, marginLeft, width, carouselImages, caption },
            index,
          ) => (
            <div
              className={`
          ${styles.image}
              ${index === currentIndex && styles.imageVisible}
            `}
              style={
                ({
                  '--marginTop': `${marginTop}%`,
                  '--marginLeft': `${marginLeft}%`,
                  '--width': `${width}%`,
                },
                index === currentIndex
                  ? { display: 'block', opacity: 1 }
                  : { display: 'none', opacity: 0 })
              }
            >
              <div
                className={`${carouselImages.length > 1 && styles.hasMultiple}`}
                onClick={() => handleNextImage(carouselImages)}
              >
                {carouselImages.map(({ image }) => {
                  {
                    image.childImageSharp ? (
                      <FluidImage
                        image={image}
                        objectFit={objectFit}
                        loading="auto"
                      />
                    ) : (
                      <img alt="" src={image} />
                    );
                  }
                })}
              </div>
            </div>
          ),
        )}
      </div>
    );
  }

  if (!images) return null;
  return (
    <div className={`${styles.carousel} ${className}`}>
      {(images || []).map(({ image, caption }, index) => (
        <div
          className={`
        ${styles.image}
            ${index === currentIndex && styles.imageVisible}
          `}
          // key={image.childImageSharp.fluid.src}
          style={
            index === currentIndex
              ? { display: 'block', opacity: 1 }
              : { display: 'none', opacity: 0 }
          }
        >
          <div
            className={`${images.length > 1 && styles.hasMultiple}`}
            onClick={handleNextImage}
          >
            {image.childImageSharp ? (
              <FluidImage image={image} objectFit={objectFit} loading="auto" />
            ) : (
              <img alt="" src={image} />
            )}
          </div>
          {caption && <ReactMarkdown escapeHtml={false} source={caption} />}
        </div>
      ))}
      <div className={styles.indicatorWrapper}>
        {title && <p>{title}</p>}
        {showIndicator && images.length > 1 && (
          <span>{`${currentIndex + 1} of ${images.length}`}</span>
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
