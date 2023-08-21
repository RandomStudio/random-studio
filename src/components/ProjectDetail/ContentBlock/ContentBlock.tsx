import React, { CSSProperties } from 'react';
import {
  BLOCK_TYPES,
  CarouselBlock,
  GenericBlockAttributes,
  ImageBlock,
  TextBlock,
  VideoBlock,
} from '../../../types/types';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import Video from '../../Video/Video';
import styles from './ContentBlock.module.scss';
import Markdown from '../../Markdown/Markdown';

type ContentBlockProps = {
  __typename: string;
  blocks?: ContentBlockProps[];
} & GenericBlockAttributes;

const ContentBlock = ({
  __typename,
  blocks = [],
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
      );
    }

    if (__typename === BLOCK_TYPES.VideoBlockRecord) {
      const { caption, hasControls, autoplay, loops, video } =
        blockProps as VideoBlock;

      return (
        <>
          {video && (
            <Video
              hasControls={hasControls}
              isAutoplaying={autoplay}
              isLooping={loops}
              video={video}
            />
          )}

          <Caption caption={caption} marginLeft={marginLeft} />
        </>
      );
    }

    if (__typename === BLOCK_TYPES.CarouselBlockRecord) {
      const { slides } = blockProps as CarouselBlock;

      return (
        <Carousel
          className={styles.carouselWrapper}
          sizes={`(max-width: 576px) 100vw, ${width}vw`}
          slides={slides}
        />
      );
    }

    if (__typename === BLOCK_TYPES.TextBlockRecord) {
      const { text } = blockProps as TextBlock;

      return (
        <div className={styles.text}>
          <Markdown markdown={text} />
        </div>
      );
    }

    if (__typename === BLOCK_TYPES.HorizontalRowRecord) {
      return (
        <div className={styles.horizontalRow}>
          {blocks.map(subblock => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ContentBlock {...subblock} key={subblock.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={styles.item}
      id={anchorId}
      key={id}
      style={
        {
          '--marginLeft': `${marginLeft}vw`,
          '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
          '--width': `${width}%`,
        } as CSSProperties
      }
    >
      {renderBlock()}
    </div>
  );
};

export default ContentBlock;
