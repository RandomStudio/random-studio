import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntroBlock.module.scss';
import Block from './Block/Block';

const IntroBlock = ({ title, intros }, ref) => (
  <section ref={ref} className={styles.wrapper}>
    {intros.map(({ copy, image, video }, index) => (
      <Block
        key={image.id}
        image={image}
        index={index}
        copy={copy}
        video={video && video.publicURL}
      />
    ))}
  </section>
);

IntroBlock.propTypes = {
  intros: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
      video: PropTypes.object,
    }),
  ).isRequired,
};

export default React.forwardRef(IntroBlock);
