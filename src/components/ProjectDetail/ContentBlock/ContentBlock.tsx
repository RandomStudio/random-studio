import React, { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { blockPropType } from '../../../propTypes';
import { BLOCK_TYPES, ContentBlockType } from '../../../types';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import styles from './ContentBlock.module.scss';

const ContentBlock = ({
    __typename,
    width,
    loops,
    hasAudio,
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
}: ContentBlockType) => (
  <div
    className={styles.item}
    key={id}
    style={{
      '--marginLeft': `${marginLeft}vw`,
      '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
      '--width': `${width}vw`,
    } as CSSProperties}
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
          hasAudio={hasAudio}
          hasControls={hasControls}
          isAutoplaying={autoplay}
          isLooping={loops}
          video={video}
          width={width}
        />

        <Caption caption={caption} marginLeft={marginLeft} />
      </>
    )}

    {__typename === BLOCK_TYPES.CarouselBlockRecord && (
      <Carousel
        className={styles.carouselWrapper}
        sizes={`(max-width: 576px) 100vw, ${width}vw`}
        slides={slides}
        width={width}
      />
    )}

    {__typename === BLOCK_TYPES.TextBlockRecord && (
      <div className={styles.text}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    )}
  </div>
);

export default ContentBlock;
