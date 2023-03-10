import React, { useState } from 'react';
import { Image } from 'react-datocms';
import styles from './Carousel.module.css';
import VideoWithControls from '../VideoWithControls/VideoWithControls';
import { Slide } from '../../types';

type CarouselProps = {
  caption?: string,
  className?: string,
  sizes: string,
  slides: Slide[],
  width: number,
};

const Carousel = ({ caption, className, slides, sizes, width }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((currentIndex + 1) % slides.length);

  if (!slides) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.slides}>
        {slides.map(({ id, video, image }, index) => (
          <div
            className={styles.image}
            data-visible={index === currentIndex}
            key={id}
          >
            <div
              className={slides.length > 1 && styles.hasMultiple}
              onClick={handleNext}
            >
              {video && (
                <VideoWithControls video={video} width={width} />
              )}

              {image && (
                <Image
                  alt={`${caption} – slide ${index + 1}`}
                  data={image}
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

export default Carousel;
