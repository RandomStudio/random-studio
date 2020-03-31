import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { motion, useViewportScroll, useTransform } from 'framer-motion';
import FluidImage from '../../../../components/FluidImage/FluidImage';

import styles from './Block.module.scss';

const Block = ({ image, index, copy, title }) => {
  const { scrollYProgress, scrollY } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  // const scale = useTransform(scrollYProgress, [0, 0], [1, 0.8]);
  // const scale = useTransform(
  //   scrollYProgress,
  //   [0 + index * 0.2, 0.1 + index * 0.2, 0.4, 0.5],
  //   [1, 0.8, 0.8, 0.2],
  // );

  const overlayOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <>
      <motion.div className={styles.imageWrapper}>
        <motion.div style={{ scale }}>
          <FluidImage className={styles.fluidImage} image={image} />
          <motion.div
            className={styles.overlay}
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>
        {index === 0 && (
          <h1 className={styles.headerTitle}>
            {title}
            <img
              src="/img/icons/arrow-white.svg"
              alt="Arrow pointing down. Indicating more content further down."
            />
          </h1>
        )}
      </motion.div>

      <div key={image.id} className={styles.listItem}>
        <div className={styles.copyWrapper}>
          {index === 0 && <h1 className={styles.headerTitle}>{title}</h1>}
          <ReactMarkdown escapeHtml={false} source={copy} />
        </div>
      </div>
    </>
  );
};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
