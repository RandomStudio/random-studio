import PropTypes from 'prop-types';
import { useContext } from 'react';
import { dayNightImageBlockPropType } from '../../../propTypes';
import Image from '../../Image/Image';
import AfterDarkContext from '../../Layout/AfterDarkContext';
import styles from './Block.module.css';
import Markdown from '../../Markdown/Markdown';

const Block = ({ block: { copy, image, nightImage }, className }) => {
  const isAfterDark = useContext(AfterDarkContext);

  return (
    <div className={`${styles.block} ${className}`}>
      <div className={`${styles.image} image`}>
        <Image alt={copy} data={(isAfterDark ? nightImage : image).imageData} />
      </div>

      <Markdown className={styles.text} markdown={copy} />
    </div>
  );
};

Block.propTypes = {
  block: dayNightImageBlockPropType.isRequired,
  className: PropTypes.string,
};

Block.defaultProps = {
  className: '',
};

export default Block;
