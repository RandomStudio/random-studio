import React from 'react';
import PropTypes from 'prop-types';
import styles from './HighlightBlock.module.scss';
import Block from './Block/Block';

const HighlightBlock = ({ title, highlights }, ref) => {
  return (
    <section ref={ref} className={styles.wrapper}>
      {highlights.map(({ copy, image, video }, index) => (
        <Block
          key={image.id}
          image={image}
          index={index}
          copy={copy}
          title={title}
          video={video && video.publicURL}
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
      video: PropTypes.object,
    }),
  ).isRequired,
};

export default React.forwardRef(HighlightBlock);
