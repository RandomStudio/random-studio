import React from 'react';
import PropTypes from 'prop-types';
import styles from './HighlightBlock.module.scss';
import Block from './Block/Block';

const HighlightBlock = ({ title, highlights }, ref) => {
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

HighlightBlock.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default React.forwardRef(HighlightBlock);
