import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Highlight.module.scss';
import Block from './Block/Block';

const Highlight = ({ title, highlights }, ref) => {
  const [dimension, setDimension] = useState({});

  useEffect(() => {
    if (ref.current) {
      const sectionDimension = ref.current.getBoundingClientRect();
      setDimension(sectionDimension);
    }
  }, [ref]);

  return (
    <section ref={ref} className={styles.wrapper}>
      {highlights.map(({ copy, image }, index) => (
        <Block
          key={image.id}
          image={image}
          index={index}
          copy={copy}
          title={title}
        />
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
