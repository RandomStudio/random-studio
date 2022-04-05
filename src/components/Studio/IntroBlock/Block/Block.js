import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import LazyVideo from '../../../LazyVideo/LazyVideo';
import styles from './Block.module.scss';
import Image from '../../../Image/Image';

const Block = ({ image, index, copy, title, video }) => {
  const imageRef = useRef();
  const overlayRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const setupAnimations = async () => {
      if (typeof ScrollTimeline === 'undefined') {
        await import('./scroll-timeline-polyfill');
      }

      const imageBox = imageRef.current.getBoundingClientRect();

      const blockStart = imageBox.top;
      const blockEnd = imageBox.bottom;

      imageRef.current.animate(
        { transform: ['scale(1)', 'scale(0.8)', 'scale(0.8)', 'scale(0.3)'] },
        {
          duration: 10000, // Totally arbitrary!
          fill: 'both',
          timeline: new ScrollTimeline({
            scrollOffsets: [
              new CSSUnitValue(blockStart, 'px'),
              new CSSUnitValue(blockEnd, 'px'),
              new CSSUnitValue(blockEnd + 300, 'px'),
              new CSSUnitValue(blockEnd + 1000, 'px'),
            ],
          }),
        },
      );

      overlayRef.current.animate(
        { opacity: [0, 1] },
        {
          duration: 10000, // Totally arbitrary!
          fill: 'both',
          timeline: new ScrollTimeline({
            scrollOffsets: [
              new CSSUnitValue(blockStart, 'px'),
              new CSSUnitValue(blockStart + 120, 'px'),
            ],
          }),
        },
      );

      if (!titleRef.current) {
        return;
      }

      titleRef.current.animate(
        { opacity: [1, 0] },
        {
          duration: 10000, // Totally arbitrary!
          fill: 'both',
          timeline: new ScrollTimeline({
            scrollOffsets: [
              new CSSUnitValue(0, 'px'),
              new CSSUnitValue(80, 'px'),
            ],
          }),
        },
      );
    };

    setupAnimations();
  }, []);

  return (
    <>
      <div className={styles.imageBlock}>
        <div className={styles.mediaWrapper} ref={imageRef}>
          {video ? (
            <LazyVideo
              alt={title}
              autoPlays
              className={styles.fluidVideo}
              isMuted
              loops
              video={video}
            />
          ) : (
            <Image
              alt={title}
              className={styles.image}
              data={image.imageData}
            />
          )}
          <div className={styles.overlay} ref={overlayRef} />
        </div>

        {index === 0 && (
          <h1 className={styles.headerTitle} ref={titleRef}>
            <img
              alt="Arrow pointing down. Indicating more content further down."
              src="/icons/arrow-white.svg"
            />
          </h1>
        )}
      </div>

      <div className={`${styles.listItem} ${styles.parallaxFront}`}>
        <div className={styles.copyWrapper}>
          <ReactMarkdown>{copy}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

Block.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  copy: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  video: PropTypes.string,
};

Block.defaultProps = {};

export default Block;
