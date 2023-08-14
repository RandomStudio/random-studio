import React, { useState } from 'react';
import { Image } from 'react-datocms';
import styles from './Carousel.module.css';
import Video from '../Video/Video';
import { Slide } from '../../types/types';

type CarouselProps = {
  caption?: string;
  className?: string;
  sizes: string;
  slides: Slide[];
};

const Carousel = ({
  caption = '',
  className = '',
  slides,
  sizes,
}: CarouselProps) => {
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
            className={styles.slide}
            data-visible={index === currentIndex}
            key={id}
            onClick={handleNext}
          >
            {video && (
              <Video
                hasControls={false}
                isAutoplaying
                isLooping
                video={video}
              />
            )}

            {image && (
              <Image
                className={styles.image}
                data={image.imageData}
                layout={index === 0 ? 'responsive' : 'fill'}
                sizes={sizes}
              />
            )}
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
