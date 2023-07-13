import React, { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { BLOCK_TYPES, CarouselBlock, GenericBlockAttributes, ImageBlock, TextBlock, VideoBlock } from '../../../types';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import Video from '../../Video/Video';
import styles from './ContentBlock.module.scss';

type ContentBlockProps = {
  __typename: string,
  blocks?: ContentBlockProps[]
} & GenericBlockAttributes;

const ContentBlock = ({
  __typename,
  blocks,
  width,
  id,
  marginLeft,
  marginTop,
  anchorId,
  ...blockProps
}: ContentBlockProps) => {
  const renderBlock = () => {
    if (__typename === BLOCK_TYPES.ImageBlockRecord) {
      const { caption, image } = blockProps as ImageBlock;
      return (
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
      )
    }
    if (__typename === BLOCK_TYPES.VideoBlockRecord) {
      const { caption, hasAudio, hasControls, autoplay, loops, video } = blockProps as VideoBlock;
      return (
        <>
          <Video
            isMuted={autoplay}
            hasControls={hasControls}
            isAutoplaying={autoplay}
            isLooping={loops}
            video={video}
          />

          <Caption caption={caption} marginLeft={marginLeft} />
        </>
      )
    }
    if (__typename === BLOCK_TYPES.CarouselBlockRecord) {
      const { slides } = blockProps as CarouselBlock;
      return (
        <Carousel
          className={styles.carouselWrapper}
          sizes={`(max-width: 576px) 100vw, ${width}vw`}
          slides={slides}
          width={width}
        />
      )
    }
    if (__typename === BLOCK_TYPES.TextBlockRecord) {
      const { text } = blockProps as TextBlock;
      return (
        <div className={styles.text}>
          <ReactMarkdown linkTarget="_blank">{text}</ReactMarkdown>
        </div>
      )
    }

    {
      __typename === BLOCK_TYPES.HorizontalRowRecord && blocks && (
        <div className={styles.horizontalRow}>
          {blocks?.map(subblock => (
            <ContentBlock {...subblock} key={subblock.id} />
          ))}
        </div>
      )
    }
  };

  return (
    <div
      className={styles.item}
      key={id}
      id={anchorId}
      style={{
        '--marginLeft': `${marginLeft}vw`,
        '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
        '--width': `${width}%`,
      } as CSSProperties}
    >
      {renderBlock()}
    </div>
  );
};

export default ContentBlock;
