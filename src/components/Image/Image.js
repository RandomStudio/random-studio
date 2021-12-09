import React, { useState } from 'react';
import NextImage from 'next/image';
import PropTypes from 'prop-types';
import cloudflareImageIds from '../../../cloudflareImageIds.json';
import styles from './Image.module.scss';

const srcToIds = src => {
  const normalizedSrc = src[0] === '/' ? src.slice(1) : src;
  const cleanSrc = normalizedSrc.replace('img/', '');

  return cloudflareImageIds[cleanSrc] ?? {};
};

const cloudflareLoader = ({ src, width }) => {
  if (process.env.NODE_ENV !== 'production') {
    return `${src}?wouldBeWidth=${width}`;
  }
  const { full } = srcToIds(src);

  return `${process.env.NEXT_PUBLIC_CDN_URL}/${full}/${width}`;
};

const Image = ({
  alt,
  className,
  objectFit,
  priority,
  quality,
  sizes,
  src,
}) => {
  const { thumb } = srcToIds(src);

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className} ${isLoaded ? styles.isLoaded : ''}`}>
      <img src={`data:image/jpeg;base64,${thumb}`} className={styles.placeholder} />
      <NextImage
        alt={alt}
        className={styles.image}
        layout="fill"
        loader={cloudflareLoader}
        objectFit={objectFit}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder="empty"
        src={src}
        onLoadingComplete={() => setIsLoaded(true)}
        {
        ...(thumb ?
          {
            //blurDataURL: `data:image/jpeg;base64,${thumb}`,
            //placeholder: "blur",
            //src: src
          } : {})
        }
      />
    </div>
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  priority: PropTypes.bool,
  quality: PropTypes.number,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ full: PropTypes.string, thumb: PropTypes.string })]).isRequired,
};

Image.defaultProps = {
  className: '',
  objectFit: 'cover',
  priority: false,
  quality: 75,
};

export default Image;
