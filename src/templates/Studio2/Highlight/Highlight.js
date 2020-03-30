import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styles from './Highlight.module.scss';
import FluidImage from '../../../components/FluidImage/FluidImage';
import Image from './Image';

const Highlight = ({ title, highlights }, ref) => {
  const [dimension, setDimension] = useState({});

  // const { scrollYProgress, scrollY } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  // const overlayOpacity = useTransform(
  //   scrollY,
  //   [0, 100],
  //   ['opacity(1)', 'opacity(0.6)'],
  // );
  // const overlayOpacity = useTransform(scrollY, [0, 100], [0, 0.6]);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getBoundingClientRect());
      const sectionDimension = ref.current.getBoundingClientRect();
      setDimension(sectionDimension);
    }

    // console.log(scrollYProgress);
  }, [ref.current]);

  return (
    <section ref={ref} className={styles.wrapper}>
      {/* <motion.div
        className={styles.overlay}
        style={{ opacity: overlayOpacity }}
      /> */}

      {highlights.map(({ copy, image }, index) => (
        <div key={image.id} className={styles.listItem}>
          <div className={styles.copyWrapper}>
            {index === 0 && <h1 className={styles.headerTitle}>{title}</h1>}
            <ReactMarkdown escapeHtml={false} source={copy} />
          </div>

          <Image image={image} index={index} />
        </div>
      ))}
    </section>
  );
};

Highlight.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default React.forwardRef(Highlight);
