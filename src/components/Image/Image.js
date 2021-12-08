import React from 'react';
import NextImage from 'next/image';
import PropTypes from 'prop-types';
import cloudflareImageIds from '../../../cloudflareImageIds.json';
import styles from './Image.module.scss';

const srcToId = src => {
  const normalizedSrc = src[0] === '/' ? src.slice(1) : src;
  const cleanSrc = normalizedSrc.replace('img/', '');

  return cloudflareImageIds[cleanSrc];
};

const cloudflareLoader = ({ src, width }) => {
  if (process.env.NODE_ENV !== 'production') {
    return `${src}?wouldBeWidth=${width}`;
  }

  return `${process.env.NEXT_PUBLIC_CDN_URL}/${srcToId(src)}/${width}`;
};

const Image = ({
  alt,
  className,
  objectFit,
  priority,
  quality,
  sizes,
  src,
}) => (
  <div className={`${styles.wrapper} ${className}`}>
    <NextImage
      alt={alt}
      className={styles.image}
      layout="fill"
      loader={cloudflareLoader}
      objectFit={objectFit}
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={src}
    />
  </div>
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  priority: PropTypes.bool,
  quality: PropTypes.number,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

Image.defaultProps = {
  className: '',
  objectFit: 'contain',
  priority: false,
  quality: 75,
};

export default Image;
