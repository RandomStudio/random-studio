import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntroBlock.module.scss';
import Block from './Block/Block';

const IntroBlock = ({ title, intros }, ref) => (
  <section className={styles.wrapper} ref={ref}>
    {intros.map(({ copy, image, video }, index) => (
      <Block
        copy={copy}
        image={image}
        index={index}
        key={image.id}
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
