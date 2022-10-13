import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from '../../Image/Image';
import AfterDarkContext from '../../Layout/AfterDarkContext';
import styles from './Block.module.css';

const Block = ({ block: { copy, image, nightImage }, className }) => {
  const isAfterDark = useContext(AfterDarkContext);

  return (
    <div className={`${styles.block} ${className}`}>
      <div className={styles.image}>
        <Image alt={copy} data={(isAfterDark ? nightImage : image).imageData} />
      </div>

      <ReactMarkdown className={styles.text}>{copy}</ReactMarkdown>
    </div>
  );
};

export default Block;
