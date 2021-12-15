import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntroBlock.module.scss';
import Block from './Block/Block';

const IntroBlock = React.forwardRef(({ title, intros }, ref) => (
  <section className={styles.wrapper} ref={ref}>
    {intros.map(({ copy, image, video }, index) => (
      <Block
        copy={copy}
        image={image}
        index={index}
        key={copy}
        title={title}
        video={video}
      />
    ))}
  </section>
));

IntroBlock.propTypes = {
  intros: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      video: PropTypes.string,
    }),
  ).isRequired,
};

IntroBlock.displayName = 'IntroBlock';

export default IntroBlock;
