import ReactMarkdown from 'react-markdown';
import Image from '../../Image/Image';
import styles from './Block.module.css';

const Block = ({ block: { image, copy } }) => (
  <div className={styles.block}>
    <div className={styles.image}>
      <Image alt={copy} data={image.imageData} />
    </div>

    <ReactMarkdown className={styles.text}>{copy}</ReactMarkdown>
  </div>
);

export default Block;
