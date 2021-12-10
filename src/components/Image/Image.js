import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import imageLookup from '../../../infrastructure/imageLookup.json';
import styles from './Image.module.scss';

const srcToIds = src => {
  const normalizedSrc = src[0] === '/' ? src.slice(1) : src;
  const cleanSrc = normalizedSrc.replace('img/', '');

  return imageLookup[cleanSrc] ?? {};
};

const getSrc = (src, width) => {
  if (process.env.NODE_ENV !== 'production') {
    return `${src}?wouldBeWidth=${width}`;
  }
  const { full } = srcToIds(src);

  return `${process.env.NEXT_PUBLIC_CDN_URL}/${full}/${width}`;
};

// Should match variant options on Cloudflare
const CLOUDFLARE_VARIANTS = [320, 512, 640, 720, 864, 1024, 1280, 1440, 1920, 2048];

const CustomImage = ({
  alt,
  className,
  sizes,
  src,
}) => {
  const imageRef = useRef();
  const { thumb } = srcToIds(src);

  const [isLoaded, setIsLoaded] = useState(false);
  const srcset = useMemo(() => CLOUDFLARE_VARIANTS.map(size => `${getSrc(src, size)} ${size}w`).join(', '), [src]);

  useEffect(() => {
    const ref = imageRef.current;

    const loadImage = async () => {
      const image = new Image();
      image.decoding = 'async';
      image.alt = alt;
      image.className = styles.image
      image.sizes = sizes;
      image.srcset = srcset;
      await image.decode()
      setIsLoaded(true)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadImage()
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${className} ${isLoaded ? styles.isLoaded : ''}`} ref={imageRef}>
      <img src={`data:image/jpeg;base64,${thumb}`} className={styles.placeholder} />
      <img
        className={styles.image}
        decoding="async"
        alt={alt}
        sizes={sizes}
        srcset={isLoaded ? srcset : null}
        src={isLoaded ? src : null}
      />
    </div>
  );
};

CustomImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool,
  quality: PropTypes.number,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ full: PropTypes.string, thumb: PropTypes.string })]).isRequired,
};

CustomImage.defaultProps = {
  className: '',
  priority: false,
  quality: 75,
};

export default CustomImage;
