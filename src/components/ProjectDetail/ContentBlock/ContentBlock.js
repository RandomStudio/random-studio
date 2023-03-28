import React from 'react';
import ReactMarkdown from 'react-markdown';
import { blockPropType } from '../../../propTypes';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import styles from './ContentBlock.module.scss';

const BLOCK_TYPES = {
  CarouselBlockRecord: 'CarouselBlockRecord',
  HorizontalRowRecord: 'HorizontalRowRecord',
  ImageBlockRecord: 'ImageBlockRecord',
  TextBlockRecord: 'TextBlockRecord',
  VideoBlockRecord: 'VideoBlockRecord',
};

const ContentBlock = ({
  block: {
    __typename,
    width,
    blocks,
    loops,
    hasAudio,
    isCentered, // missing
    hasControls,
    caption,
    autoplay,
    id,
    image,
    slides,
    marginLeft,
    marginTop,
    text,
    video,
  },
}) => (
  <div
    className={styles.item}
    key={id}
    style={{
      '--marginLeft': `${marginLeft}vw`,
      '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
      '--width': `${width}vw`,
    }}
  >
    {__typename === BLOCK_TYPES.ImageBlockRecord && (
      <>
        <Image
          data={image.imageData}
          layout="intrinsic"
          objectFit="cover"
          objectPosition="50% 50%"
          sizes={`(max-width: 576px) 100vw, ${width}vw`}
        />

        <Caption caption={caption} marginLeft={marginLeft} />
      </>
    )}

    {__typename === BLOCK_TYPES.VideoBlockRecord && (
      <>
        <VideoWithControls
          autoplay={autoplay}
          caption={caption}
          hasAudio={hasAudio}
          hasControls={hasControls}
          loops={loops}
          video={video}
          width={width}
        />

        <Caption caption={caption} marginLeft={marginLeft} width={width} />
      </>
    )}

    {__typename === BLOCK_TYPES.CarouselBlockRecord && (
      <Carousel
        className={styles.carouselWrapper}
        sizes={`(max-width: 576px) 100vw, ${width}vw`}
        slides={slides}
      />
    )}

    {__typename === BLOCK_TYPES.TextBlockRecord && (
      <div className={`${styles.text} ${isCentered ? styles.isCentered : ''}`}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    )}

    {__typename === BLOCK_TYPES.HorizontalRowRecord && blocks && (
      <div className={styles.horizontalRow}>
        {blocks?.map(subblock => (
          <ContentBlock block={subblock} key={subblock.id} />
        ))}
      </div>
    )}
  </div>
);

ContentBlock.propTypes = {
  block: blockPropType.isRequired,
};

export default ContentBlock;
