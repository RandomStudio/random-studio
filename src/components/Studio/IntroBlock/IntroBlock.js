import React from 'react';
import PropTypes from 'prop-types';
import styles from './IntroBlock.module.scss';
import Block from './Block/Block';
import { introBlockPropType } from '../../../propTypes';

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
  intros: PropTypes.arrayOf(introBlockPropType).isRequired,
  title: PropTypes.string.isRequired,
};

IntroBlock.displayName = 'IntroBlock';

export default IntroBlock;
