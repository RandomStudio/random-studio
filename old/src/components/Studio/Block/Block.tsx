import { useContext } from 'react';
import Image from '../../Image/Image';
import AfterDarkContext from '../../Layout/AfterDarkContext';
import styles from './Block.module.css';
import Markdown from '../../Markdown/Markdown';
import { DayNightImageBlock } from '../../../types/types';

type BlockProps = {
  block: DayNightImageBlock;
  className?: string;
};

const Block = ({
  block: { copy, image, nightImage },
  className = '',
}: BlockProps) => {
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

export default Block;
