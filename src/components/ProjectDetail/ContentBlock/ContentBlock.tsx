import React, { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { blockPropType } from '../../../propTypes';
import { BLOCK_TYPES, CarouselBlock, ImageBlock, TextBlock, VideoBlock } from '../../../types';
import Caption from '../../Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import Image from '../../Image/Image';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import styles from './ContentBlock.module.scss';

type ContentBlockProps = {
  __typename: string,
  width: number,
  id: string,
  marginLeft: number,
  marginTop: number,
}

const ContentBlock = ({
    __typename,
    width,
    id,
    marginLeft,
    marginTop,
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
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      )
    }
  };

  return (
    <div
      className={styles.item}
      key={id}
      style={{
        '--marginLeft': `${marginLeft}vw`,
        '--marginTop': `calc(${width}vw * ${marginTop / 100})`,
        '--width': `${width}vw`,
      } as CSSProperties}
    >
      {renderBlock()}
    </div>
  );
};

export default ContentBlock;
