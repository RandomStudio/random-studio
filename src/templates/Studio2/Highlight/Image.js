import React from 'react';
import PropTypes from 'prop-types';

import { motion, useViewportScroll, useTransform } from 'framer-motion';
import FluidImage from '../../../components/FluidImage/FluidImage';

import styles from './Highlight.module.scss';

const Image = ({ image, index }) => {
  const { scrollYProgress, scrollY } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const overlayOpacity = useTransform(
    scrollY,
    [0, 100],
    ['opacity(1)', 'opacity(0.6)'],
  );

  return (
    <motion.div
      className={styles.imageWrapper}
      style={{ scale, filter: overlayOpacity }}
    >
      <FluidImage
        className={styles.fluidImage}
        image={image}
        // style={{ scale }}
      />
    </motion.div>
  );
};

Image.propTypes = {};
Image.defaultProps = {};

export default Image;
